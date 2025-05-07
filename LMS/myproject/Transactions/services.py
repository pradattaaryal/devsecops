import logging
from .repositories import TransactionRepository

logger = logging.getLogger('Transactions')

class TransactionService:
    def __init__(self):
        self.repository = TransactionRepository()

    def get_all_Transactions(self):
        try:
            logger.info(f"Fetching transactions.")
            transactions = self.repository.get_all()
            logger.info(f"Fetched {len(transactions)} transactions.")
            return transactions
        except Exception as e:
            logger.error(f"Error fetching transactions: {str(e)}")
            raise

    def get_Transaction_by_id(self, transaction_id):
        return self.repository.get_by_id(transaction_id)

    def create_Transaction(self, data):
        try:
            return self.repository.create(data)
        except ValueError as e:
            # Re-raise value errors like "book not available" or "not borrowed"
            logger.warning(f"Business rule violation: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Error creating transaction: {str(e)}")
            raise

    def update_Transaction(self, transaction_id, data):
        return self.repository.update(transaction_id, data)

    def delete_Transaction(self, transaction_id):
        return self.repository.delete(transaction_id)