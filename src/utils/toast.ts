import toast from 'react-hot-toast';

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      style: {
        background: '#1F2937',
        color: '#fff',
        borderRadius: '0.5rem',
      },
    });
  },

  error: (message: string) => {
    toast.error(message, {
      style: {
        background: '#1F2937',
        color: '#fff',
        borderRadius: '0.5rem',
      },
    });
  },

  loading: (message: string) => {
    return toast.loading(message, {
      style: {
        background: '#1F2937',
        color: '#fff',
        borderRadius: '0.5rem',
      },
    });
  },
};
