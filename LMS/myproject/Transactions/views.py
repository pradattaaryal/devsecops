from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TransactionSerializer
from .services import TransactionService
from rest_framework.permissions import AllowAny

class TransactionListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            service = TransactionService()
            transactions = service.get_all_Transactions()
            serializer = TransactionSerializer(transactions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            try:
                transaction = serializer.save()
                return Response(TransactionSerializer(transaction).data, status=status.HTTP_201_CREATED)
            except ValueError as e:
                # Business rule violations
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TransactionDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, transaction_id):
        try:
            service = TransactionService()
            transaction = service.get_Transaction_by_id(transaction_id)
            if transaction:
                serializer = TransactionSerializer(transaction)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, transaction_id):
        try:
            service = TransactionService()
            data = request.data
            transaction = service.update_Transaction(transaction_id, data)
            if transaction:
                serializer = TransactionSerializer(transaction)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, transaction_id):
        try:
            service = TransactionService()
            result = service.delete_Transaction(transaction_id)
            if result:
                return Response({"message": "Transaction deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            return Response({"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)