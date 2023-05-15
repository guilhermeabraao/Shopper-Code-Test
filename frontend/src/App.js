
import './App.css';
import FileInput from './components/FileInput';
import Notification from './components/Notification';
import ProductsTable from './components/ProductsTable';
import UpdateButton from './components/UpdateButton';
import ProductsProvider from './context/productsContext';

function App() {

  return (
    <div className="App">
      <ProductsProvider>
        <FileInput />
        <ProductsTable />
        <UpdateButton />
        <Notification />
      </ProductsProvider>
    </div>
  );
}

export default App;
