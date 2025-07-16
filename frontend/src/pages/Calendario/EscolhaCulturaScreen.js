import React, { useContext } from "react";

import GridMenu from "../../components/GridMenu";
import ScreenLayout from "../../components/ScreenLayout";
import { CropIcons } from "../../components/CropIcons";

export default function AgricultorHome() {
  const items = [
    {
      name: "Algodão",
      params: { cropSlug: "algodao" },
      icon: CropIcons.algodao,
      label: "Calendário",
    },
    {
      name: "Amendoim 1ª safra",
      params: { cropSlug: "amendoim-1a-safra" },
      icon: CropIcons.amendoim,
      label: "Calendário",
    },
    {
      name: "Amendoim 2ª safra",
      params: { cropSlug: "amendoim-2a-safra" },
      icon: CropIcons.amendoim,
      label: "Calendário",
    },
    {
      name: "Arroz",
      params: { cropSlug: "arroz" },
      icon: CropIcons.arroz,
      label: "Calendário",
    },
    {
      name: "Feijão 1ª safra",
      params: { cropSlug: "feijao-1a-safra" },
      icon: CropIcons.feijao,
      label: "Calendário",
    },
    {
      name: "Feijão 2ª safra",
      params: { cropSlug: "feijao-2a-safra" },
      icon: CropIcons.feijao,
      label: "Calendário",
    },
    {
      name: "Feijão 3ª safra",
      params: { cropSlug: "feijao-3a-safra" },
      icon: CropIcons.feijao,
      label: "Calendário",
    },
    {
      name: "Girassol",
      params: { cropSlug: "girassol" },
      icon: CropIcons.girassol,
      label: "Calendário",
    },
    {
      name: "Mamona",
      params: { cropSlug: "mamona" },
      icon: CropIcons.mamona,
      label: "Calendário",
    },
    {
      name: "Milho 1ª safra",
      params: { cropSlug: "milho-1a-safra" },
      icon: CropIcons.milho,
      label: "Calendário",
    },
    {
      name: "Milho 2ª safra",
      params: { cropSlug: "milho-2a-safra" },
      icon: CropIcons.milho,
      label: "Calendário",
    },
    {
      name: "Milho 3ª safra",
      params: { cropSlug: "milho-3a-safra" },
      icon: CropIcons.milho,
      label: "Calendário",
    },
    {
      name: "Soja",
      params: { cropSlug: "soja" },
      icon: CropIcons.soja,
      label: "Calendário",
    },
    {
      name: "Sorgo",
      params: { cropSlug: "sorgo" },
      icon: CropIcons.sorgo,
      label: "Calendário",
    },
    {
      name: "Aveia",
      params: { cropSlug: "aveia" },
      icon: CropIcons.oat,
      label: "Calendário",
    },
    {
      name: "Canola",
      params: { cropSlug: "canola" },
      icon: CropIcons.canola,
      label: "Calendário",
    },
    {
      name: "Centeio",
      params: { cropSlug: "centeio" },
      icon: CropIcons.centeio,
      label: "Calendário",
    },
    {
      name: "Cevada",
      params: { cropSlug: "cevada" },
      icon: CropIcons.barley,
      label: "Calendário",
    },
    {
      name: "Trigo",
      params: { cropSlug: "trigo" },
      icon: CropIcons.cereal,
      label: "Calendário",
    },
    {
      name: "Triticale",
      params: { cropSlug: "triticale" },
      icon: CropIcons.triticale,
      label: "Calendário",
    },
  ];

  return (
    <ScreenLayout isScrollable={true} hasHeader={true}>
      <GridMenu items={items} />
    </ScreenLayout>
  );
}
