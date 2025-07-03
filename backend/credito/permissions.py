from rest_framework import permissions

class IsOwnerOrAnalyst(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object or 'analista' users to access it.
    This is for object-level permissions (e.g., detail views like AvaliarView).
    """
    def has_object_permission(self, request, view, obj):
        # Allow if the user is the owner of the SolicitacaoCredito
        if obj.user == request.user:
            return True
        
        # Allow if the user's role is 'analista'
        if hasattr(request.user, 'role') and request.user.role == 'analista':
            return True

        return False

class IsOwnerOrAnalystForList(permissions.BasePermission):
    """
    Custom permission to control list access.
    'Analista' users can see all. Other authenticated users (owners) can list their own.
    """
    def has_permission(self, request, view):
        # Only authenticated users can access this list endpoint
        if not request.user or not request.user.is_authenticated:
            return False
        
        return True