import { create } from 'zustand';

interface UploadModalStore {
   isOpen: boolean;
   onOpen: () => void;
   onClose: () => void;
   };

   const useUploadModal = create<UploadModalStore>((set) => ({
      isOpen: false,
      onOpen: () => {
        console.log("onOpen called");
        set({ isOpen: true });
      },
      onClose: () => set({ isOpen: false }),
    }));
    

export default useUploadModal;