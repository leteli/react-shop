interface IContext {
  isModalOpen: boolean;
  toggleModal: () => void;
  isLoggedIn: boolean;
  changeLoginStatus: () => void;
  currentUser: string | null,
  setUser: (user: string | null) => void;
};

export interface IUpdatedData {
  name: string;
  author: string;
  price: number;
  inStock: number;
  description: string;
};

export interface IProductData extends IUpdatedData {
  id: number;     
  picture: string;
};

export interface ICartProductData {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
};


export default IContext;
