'use client';

import { Product } from "../type/type";

interface ProductTableProps {
  products: Product[];
  showPerPage: number;
}

export default function ProductTable({ products, showPerPage }: ProductTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'On Sale':
        return 'bg-blue-100 text-blue-800';
      case 'Bouncing':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2">
                Product Name
                <div className="w-3 h-3 flex items-center justify-center">
                  <i className="ri-arrow-up-down-line text-xs"></i>
                </div>
              </div>
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2">
                Product ID
                <div className="w-3 h-3 flex items-center justify-center">
                  <i className="ri-arrow-up-down-line text-xs"></i>
                </div>
              </div>
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2">
                Price
                <div className="w-3 h-3 flex items-center justify-center">
                  <i className="ri-arrow-up-down-line text-xs"></i>
                </div>
              </div>
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2">
                Stock
                <div className="w-3 h-3 flex items-center justify-center">
                  <i className="ri-arrow-up-down-line text-xs"></i>
                </div>
              </div>
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2">
                Type
                <div className="w-3 h-3 flex items-center justify-center">
                  <i className="ri-arrow-up-down-line text-xs"></i>
                </div>
              </div>
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2">
                Status
                <div className="w-3 h-3 flex items-center justify-center">
                  <i className="ri-arrow-up-down-line text-xs"></i>
                </div>
              </div>
            </th>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2">
                Action
                <div className="w-3 h-3 flex items-center justify-center">
                  <i className="ri-arrow-up-down-line text-xs"></i>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.slice(0, showPerPage).map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-all">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover object-top"
                  />
                  <span className="font-medium text-gray-900">{product.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600">{product.productId}</td>
              <td className="px-6 py-4 font-medium text-gray-900">${product.price}</td>
              <td className="px-6 py-4 text-gray-600">{product.stock}</td>
              <td className="px-6 py-4 text-gray-600">{product.type}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
                  <i className="ri-more-2-line"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}