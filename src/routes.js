import Login from "@/components/Login";
import DashBoard from "@/components/DashBoard";
import ListUser from "@/components/User/List";
import AddUser from "@/components/User/Add";
import EditUser from "@/components/User/Edit";
import ListCategory from "@/components/Category/List";
import AddCategory from "@/components/Category/Add";
import EditCategory from "@/components/Category/Edit";
import ListProvider from "@/components/Provider/List";
import AddProvider from "@/components/Provider/Add";
import EditProvider from "@/components/Provider/Edit";
import ListProduct from "@/components/Product/List";
import AddProduct from "@/components/Product/Add";
import EditProduct from "@/components/Product/Edit";

const routes = [
    // login route
    {
        path: '/',
        name: 'login',
        component: Login,
        meta: {
            requiredGuess: true,
        }
    },
    // Dashboard route
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashBoard,
        meta: {
            requiredAuth: true,
        }
    },
    //User route
    {
        path: '/user/list',
        name: 'user-list',
        component: ListUser,
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: '/user/add',
        name: 'user-add',
        component: AddUser,
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: '/user/edit/:id',
        name: 'user-edit',
        component: EditUser,
        meta: {
            requiredAuth: true,
        }
    },
    // Category route
    {
        path: '/category/list',
        name: 'category-list',
        component: ListCategory,
        meta: {
            requiredAuth: true,
        }

        },
    {
        path: '/category/add',
        name: 'category-add',
        component: AddCategory,
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: '/category/edit/:id',
        name: 'category-edit',
        component: EditCategory,
        meta: {
            requiredAuth: true,
        }
    },
    // Provider Route
    {
        path: '/provider/list',
        name: 'provider-list',
        component: ListProvider,
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: '/provider/add',
        name: 'provider-add',
        component: AddProvider,
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: '/provider/edit/:id',
        name: 'provider-edit',
        component: EditProvider,
        meta: {
            requiredAuth: true,
        }
    },
    // Product Route
    {
        path: '/product/list',
        name: 'product-list',
        component: ListProduct,
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: '/product/add',
        name: 'product-add',
        component: AddProduct,
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: '/product/edit/:id',
        name: 'product-edit',
        component: EditProduct,
        meta: {
            requiredAuth: true,
        }
    },
]

export default routes