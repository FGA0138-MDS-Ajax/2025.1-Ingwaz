from django.conf import settings
import requests, re, json
import pandas as pd
from io import BytesIO
from time import sleep

def from_json_to_dict(filename):
    with open(filename, 'r', encoding='utf-8') as arquivo:
        return json.load(arquivo)
        
# essa consulta no banco de dados não dá a unidade :(
# url = f'https://www.cepea.org.br/br/consultas-ao-banco-de-dados-do-site.aspx?tabela_id={id}&data_inicial=01/01/2025&data_final=01/01/2026&periodicidade=4'
# pegando do widget:
cepea_url = 'https://www.cepea.org.br/br/widgetproduto.js.php?'
hfbrasil_url = 'https://www.hfbrasil.org.br/br/estatistica/preco/exportar.aspx?&periodicidade=anual&ano_inicial=2025&ano_final=2025'
products_path = str(settings.BASE_DIR) + '/quotes/products/'
cepea_products = from_json_to_dict(products_path + 'cepea.json')
hfbrasil_products = from_json_to_dict(products_path + 'hfbrasil.json')
    
pattern = re.compile(
    r'<td>(.*?)</td>'
    r'.*?'
    r'<span class="maior">(.*?)</span>'
    r'.*?'
    r'<span class="unidade">(.*?)</span>'
    r'.*?'
    r'R\$\s*<span class="maior">(.*?)</span>',
    re.DOTALL
)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

def get_cepea_data(url):
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        html_content = response.text
        html_content = html_content.split('<tbody>', 1)[1]
        html_content = html_content.split('</tbody>', 1)[0]
        matches = pattern.findall(html_content)
        data = []
        for match in matches:
            date, name, unity, price_str = match
            item = {
                'date': date.strip(),
                'name': name.strip(),
                'unity': unity.strip(),
                'value': float(price_str.strip().replace('.', '').replace(',', '.'))
            }
            data.append(item)
        return data
    except Exception as e:
        print(f'error: {e}')
        return None
      
def get_hfbrasil_data(url):
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        df = pd.read_excel(BytesIO(response.content))
        df = df.iloc[:-1].copy()
        df['name'] = df['Produto'] + ' - ' + df['Região']
        df = df.rename(columns={
            'Ano': 'date',
            'Unidade': 'unity',
            'Preço': 'value'
        })
        df['date'] = df['date'].astype(int)
        df = df[['date', 'name', 'unity', 'value']]
        data = df.to_dict(orient='records')
        return data
    except Exception as e:
        print(f'error: {e}')
        return None

def get_regions_ids(id):
    try:
        url = 'https://www.hfbrasil.org.br/index.php?idioma=br&rota=estatistica/regiao'
        response = requests.post(url, data={'projeto': id}, headers=headers)
        response.raise_for_status()
        regions = response.json()
        data = []
        for region in regions:
            id, name = region.values()
            data.append(id)
        return data
    except Exception as e:
        print(f'error: {e}')
        return None

def get_all_cepea_quotes():
    url = cepea_url
    for product_name in cepea_products:
        url += '&id_indicador[]=' + cepea_products[product_name]
    data = get_cepea_data(url)
    if data is not None:
        return (data, True)
    return ('Serviço indisponível no momento', False)
    
def get_all_hfbrasil_quotes():
    all_data = []
    for product_name in hfbrasil_products:
        url = hfbrasil_url + '&produto=' + hfbrasil_products[product_name]
        ids = get_regions_ids(hfbrasil_products[product_name])
        if ids is not None:
            for id in ids:
                url += '&regiao[]=' + id
            data = get_hfbrasil_data(url)
            if data is not None:
                for item in data:
                    if product_name not in item['name']:
                        item['name'] = product_name + ' ' + item['name']
                all_data += data
            else:
                return ('Serviço indisponível no momento', False)
        sleep(1)
        print("saving...")
    print('done')
    return (all_data, True)
    