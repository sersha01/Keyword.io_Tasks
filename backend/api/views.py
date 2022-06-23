from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import User, Book
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .serializer import BookSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.user.name
        token['email'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def userSignup(request):
    name = request.data['name']
    username = request.data['username']
    password = request.data['password'] 
    if User.objects.filter(username=username).exists():
        return Response({'status': False, 'error': 'Email already exists'})
    else:
        user = User.objects.create(name=name, username=username)
        user.set_password(password)
        user.save()
        return Response({'status': True, 'message': 'Account created successfully'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBook(request):
    serializer = BookSerializer()
    serializer.create(validated_data=request.data)
    print(serializer)
    return Response({'status': True, 'message': 'Book created successfully'})

@api_view(['GET'])
def retrieveBooks(request):
    books = [{'id':book.id,'image':book.image,'title':book.title,'author':book.author,'discription':book.description}
     for book in Book.objects.all()]
    return Response({'status': True, 'data': books})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateBook(request):
    book = Book.objects.get(id=request.data['id'])
    book.title = request.data['title'] if 'title' in request.data else book.title
    book.author = request.data['author'] if 'author' in request.data else book.author
    book.description = request.data['description'] if 'description' in request.data else book.description
    book.save()
    return Response({'status': True, 'message': 'Book updated successfully'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteBook(request):
    book = Book.objects.get(id=request.data['id'])
    book.delete()
    return Response({'status': True, 'message': 'Book deleted successfully'})