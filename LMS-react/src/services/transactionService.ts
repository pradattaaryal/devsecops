interface TransactionData {
    student: number;
    user: string;
    book: number;
    transaction_type: string;
    date: string;
  }
  
  interface TransactionResponse extends TransactionData {
    transaction_id: number;
    student_name?: string;
    librarian_name?: string;
    book_name?: string;
  }
  
  const API_BASE_URL = 'http://127.0.0.1:8000';
  
  export const createTransaction = async (transactionData: TransactionData): Promise<TransactionResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  };