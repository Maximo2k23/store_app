import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import { ProductService } from './service/ProductService';
import { apiGatewayService } from './service/apiGatewayService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
//import './flags.css'

export default function Product() {
    let emptyProduct = {
        id: null,
        code: '',
        name: '',
        description: '',
        availability: '',
        product_type:"",
        reviews: "",
        sale_price: "",
        status: 1,
        tags: "polo,sport",
        trademark: "Adidas"
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        fetch('http://localhost:8004/store/product?status=1')
        .then(response => response.json())
        .then(data => {console.log('data', data.data);setProducts(data.data)})
        .catch(error => console.error(error))
        
        //apiGatewayService.getProducts().then((data) => {setProducts(data.data); console.log('data', data)});
    }, []);

    

    //const formatCurrency = (value) => {
    //    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    //};

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    /* const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };

            // editar
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                // enviando data a apigateway
                apiGatewayService.saveProduct(_product)
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    }; */

    const saveProduct = () => {
        setSubmitted(true);
    
        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };

            _product['sale_price']=_product['sale_price'].toString()
    
            // Convertir reviews a número
            //_product.reviews = parseFloat(_product.reviews);
    
            // Genera el nuevo código si es un nuevo producto
            if (!_product.id) {
                _product.code = generateProductCode();
            }
    
            // actualizar el producto
            if (_product.id) {
                const index = findIndexById(_product.id);
    
                _products[index] = _product;
                const prod = { ..._product }
                apiGatewayService.updateProduct(_product.id,prod)
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                // crear el producto
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                // Envía datos a apiGateway
                apiGatewayService.saveProduct(_product)
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }
    
            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };
    
    
    
    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);

        setProducts(_products);
        apiGatewayService.updateProduct(product.id, {status: 0})
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));

        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };        
        _product[`${name}`] = val.toString();
        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" className="bg-green-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-green-700" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="bg-red-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-red-700" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-blue-700" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    //const priceBodyTemplate = (rowData) => {
    //    return formatCurrency(rowData.price);
    //};

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.reviews} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button label='Editar' icon="pi pi-pencil" className="bg-yellow-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-yellow-700" onClick={() => editProduct(rowData)} />
                <Button label='Eliminar' icon="pi pi-trash" className="bg-red-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-red-700" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const generateProductCode = () => {
        // Encuentra el último código utilizado en los productos existentes
        const lastProduct = products[products.length - 1];
    
        // Si no hay productos existentes o el código no sigue el formato esperado, empieza desde 0
        let lastCode = 0;
        if (lastProduct && lastProduct.code.startsWith('PROD')) {
            const lastCodeStr = lastProduct.code.replace('PROD', '').trim();
            lastCode = parseInt(lastCodeStr, 10);
            if (isNaN(lastCode)) {
                lastCode = 0;
            }
        }
    
        // Genera el nuevo código aumentando el último código en 1
        const newCode = 'PROD' + (lastCode + 1).toString().padStart(3, '0'); // Asegura que los números tengan al menos 3 dígitos
    
        return newCode;
    };
    
    
    

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 items-center justify-between">
            <h4 className="m-0 font-bold text-lg">Manage Products</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" className="p-2 border rounded" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="bg-red-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-red-700" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="bg-green-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-green-700" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="bg-red-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-red-700" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="bg-green-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-green-700" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="bg-red-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-red-700" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="bg-green-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-green-700" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <Toolbar className="mb-4 flex flex-wrap gap-2" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

            <DataTable
                ref={dt}
                value={products}
                selection={selectedProducts}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                dataKey="id"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                className="datatable-responsive shadow overflow-hidden border-b border-gray-200 sm:rounded-lg divide-y divide-gray-200"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                globalFilter={globalFilter}
                emptyMessage="No products found."
                header={header}
                responsiveLayout="scroll"
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} className="bg-gray-50"></Column>
                <Column field="code" header="Code" sortable className="p-4 text-gray-800"></Column>
                <Column field="name" header="Name" sortable className="p-4 text-gray-800"></Column>
                <Column header="Image" body={imageBodyTemplate} bodyClassName="p-4"></Column>
                <Column field="sale_price" header="Price" sortable className="p-4 text-gray-800"></Column>
                <Column field="product_type" header="Category" sortable className="p-4 text-gray-800"></Column>
                <Column field="trademark" header="Trademark" sortable className="p-4 text-gray-800"></Column>
                <Column field="tags" header="Tags" sortable className="p-4 text-gray-800"></Column>
                <Column field="reviews" header="Reviews" body={ratingBodyTemplate} bodyClassName="p-4"></Column>
                <Column field="description" header="Description" sortable className="p-4 text-gray-800"></Column>
                <Column field="availability" header="Availability" className="p-4 text-gray-800"></Column>
                <Column field="status" header="Status" className="p-4 text-gray-800"></Column>
                <Column body={actionBodyTemplate} bodyClassName="p-4 text-gray-800"></Column>
            </DataTable>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold mb-2">Name</label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold mb-2">Description</label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
                <div className="field">
                    <label htmlFor="availability" className="font-bold mb-2">Availability</label>
                    <InputText id="availability" value={product.availability} onChange={(e) => onInputChange(e, 'availability')} required />
                </div>
                <div className="field">
                    <label htmlFor="category" className="font-bold mb-2">Category</label>
                    <InputText id="category" value={product.product_type} onChange={(e) => onInputChange(e, 'product_type')} required />
                </div>
                {/* <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.product_type === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div> */}
                <div className="field">
                    <label htmlFor="sale_price" className="font-bold mb-2">Price</label>
                    <InputNumber id="sale_price" value={product.sale_price} onValueChange={(e) => onInputNumberChange(e, 'sale_price')} mode="currency" currency="USD" locale="en-US" />
                </div>
                <div className="field">
                    <label htmlFor="reviews" className="font-bold mb-2">Reviews</label>
                    <InputText id="reviews" value={product.reviews} onChange={(e) => onInputChange(e, 'reviews')} />
                </div>
                <div className="field">
                    <label htmlFor="status" className="font-bold mb-2">Status</label>
                    <InputText id="status" value={product.status} onChange={(e) => onInputChange(e, 'status')} />
                </div>
                <div className="field">
                    <label htmlFor="tags" className="font-bold mb-2">Tags</label>
                    <InputText id="tags" value={product.tags} onChange={(e) => onInputChange(e, 'tags')} />
                </div>
                <div className="field">
                    <label htmlFor="trademark" className="font-bold mb-2">Trademark</label>
                    <InputText id="trademark" value={product.trademark} onChange={(e) => onInputChange(e, 'trademark')} />
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}
