import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import { ProductService } from './service/ProductService';
import { apiGatewayService } from './service/apiGatewayService';
import { Toast } from 'primereact/toast';
//import './DataTableDemo.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
// import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
//import { FileUpload } from 'primereact/fileupload';
//import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
//import { RadioButton } from 'primereact/radiobutton';
//import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
//import { Tag } from 'primereact/tag';
//import './flags.css'

export default function Inventory() {
    let emptyProduct = {
        id: null,
        "product_id": 0,
        "cost": "0",
        "quantity": 0,
        "quantity_max": 0,
        "quantity_min": 0,
        "due_date": "",
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [productList, setProductList] = useState([]);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        fetch('http://localhost:8004/store/inventory')
        .then(response => response.json())
        .then(data => {console.log('data', data.data);setProducts(data.data)})
        .catch(error => console.error(error))
        
    }, []);



    const openNew = () => {
        let productList = apiGatewayService.getProductList()
        setProductList(productList)
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


    const saveProduct = () => {
        setSubmitted(true);
    
        //if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };

            if (!_product.id) {
                _product.code = generateProductCode();
            }
    
            // actualizar el producto
            if (_product.id) {
                const index = findIndexById(_product.id);
    
                _products[index] = _product;
                const prod = { ..._product }
                prod.cost = prod.cost+""
                apiGatewayService.update(_product.id,prod, 'inventory')
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                // crear el producto
                _product.id = createId();
                //_product.image = 'product-placeholder.svg';
                _products.push(_product);
                // Envía datos a apiGateway
                apiGatewayService.save(_product, 'inventory')
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }
    
            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        //}
    };
    
    
    
    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    //const confirmDeleteProduct = (product) => {
    //    setProduct(product);
    //    setDeleteProductDialog(true);
    //};

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);

        setProducts(_products);
        apiGatewayService.updateProduct(product.id, {status: "0"})
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

    //const confirmDeleteSelected = () => {
    //    setDeleteProductsDialog(true);
    //};

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));

        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    //const onCategoryChange = (e) => {
    //    let _product = { ...product };
    //    _product['category'] = e.value;
    //    setProduct(_product);
    //};

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    //const onInputNumberChange = (e, name) => {
    //    const val = e.value || 0;
    //    let _product = { ...product };        
    //    _product[`${name}`] = val.toString();
    //    setProduct(_product);
    //};

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                {/* <Button label="New" icon="pi pi-plus" className="bg-green-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-green-700" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="bg-red-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-red-700" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-blue-700" onClick={exportCSV} />;
    };

    //const imageBodyTemplate = (rowData) => {
    //    return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    //};
//
    //const ratingBodyTemplate = (rowData) => {
    //    return <Rating value={rowData.reviews} readOnly cancel={false} />;
    //};

    //const statusBodyTemplate = (rowData) => {
    //    return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    //};

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button label='Editar' icon="pi pi-pencil" className="bg-yellow-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-yellow-700" onClick={() => editProduct(rowData)} />
                {/* <Button label='Eliminar' icon="pi pi-trash" className="bg-red-500 text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-red-700" onClick={() => confirmDeleteProduct(rowData)} /> */}
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
    
    //const getSeverity = (product) => {
    //    switch (product.inventoryStatus) {
    //        case 'INSTOCK':
    //            return 'success';
    //
    //        case 'LOWSTOCK':
    //            return 'warning';
    //
    //        case 'OUTOFSTOCK':
    //            return 'danger';
    //
    //        default:
    //            return null;
    //    }
    //};

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

    let product_id_input;
    if (product.id != null) {
        console.log(product.id)
        product_id_input = <InputText id="product_id" disabled value={product.product_id} onChange={(e) => onInputChange(e, 'product_id')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.product_id })} />
    } else {
        product_id_input = <InputText id="product_id" value={product.product_id} onChange={(e) => onInputChange(e, 'product_id')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.product_id })} />
        /* product_id_input = (
            <p>
                <select>
                    { productList.map( (item) => {
                        <option value={item.id}>{item.name}</option>
                    })
                    }
                </select>
            </p>
        ) */
    }

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
                <Column field="product_id" header="Product id" sortable className="p-4 text-gray-800"></Column>
                <Column field="cost" header="Cost" sortable className="p-4 text-gray-800"></Column>
                <Column field="quantity" header="Quantity" sortable className="p-4 text-gray-800"></Column>
                <Column field="quantity_max" header="Quantity max" sortable className="p-4 text-gray-800"></Column>
                <Column field="quantity_min" header="Quantity min" sortable className="p-4 text-gray-800"></Column>
                <Column field="due_date" header="Due date" sortable className="p-4 text-gray-800"></Column>
                {/* <Column field="status" header="Status" className="p-4 text-gray-800"></Column> */}
                <Column body={actionBodyTemplate} bodyClassName="p-4 text-gray-800"></Column>
            </DataTable>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Inventory Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="product_id" className="font-bold mb-2">Product Id</label>
                    { product_id_input }
                    {submitted && !product.product_id && <small className="p-error">Product Id required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="cost" className="font-bold mb-2">Cost</label>
                    <InputTextarea id="cost" value={product.cost} onChange={(e) => onInputChange(e, 'cost')} required />
                </div>
                <div className="field">
                    <label htmlFor="quantity" className="font-bold mb-2">Quantity</label>
                    <InputText id="quantity" value={product.quantity} onChange={(e) => onInputChange(e, 'quantity')} required />
                </div>
                <div className="field">
                    <label htmlFor="quantity_max" className="font-bold mb-2">Quantity Max</label>
                    <InputText id="quantity_max" value={product.quantity_max} onChange={(e) => onInputChange(e, 'quantity_max')} required />
                </div>
                <div className="field">
                    <label htmlFor="quantity_min" className="font-bold mb-2">Quantity Min</label>
                    <InputText id="quantity_min" value={product.quantity_min} onChange={(e) => onInputChange(e, 'quantity_min')} required />
                </div>
                <div className="field">
                    <label htmlFor="due_date" className="font-bold mb-2">Due Date</label>
                    <InputText id="due_date" value={product.due_date} onChange={(e) => onInputChange(e, 'due_date')} />
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
