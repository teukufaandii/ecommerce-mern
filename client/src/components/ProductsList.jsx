import { useState } from "react";
import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [productToDelete, setProductToDelete] = useState(null);

	const handleDelete = (id) => {
		deleteProduct(id);
		setIsConfirmOpen(false);
		setProductToDelete(null);
	};

	return (
		<>
			<motion.div
				className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead className='bg-gray-700'>
						<tr>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
							>
								Product
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
							>
								Price
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
							>
								Category
							</th>

							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
							>
								Featured
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
							>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='bg-gray-800 divide-y divide-gray-700'>
						{products?.map((product) => (
							<tr key={product._id} className='hover:bg-gray-700'>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-10 w-10'>
											<img
												className='h-10 w-10 rounded-full object-cover'
												src={product.image}
												alt={product.name}
											/>
										</div>
										<div className='ml-4'>
											<div className='text-sm font-medium text-white'>{product.name}</div>
										</div>
									</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>${product.price.toFixed(2)}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{product.category}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<button
										onClick={() => toggleFeaturedProduct(product._id)}
										className={`p-1 rounded-full ${
											product.isFeatured
												? "bg-yellow-400 text-gray-900"
												: "bg-gray-600 text-gray-300"
										} hover:bg-yellow-500 transition-colors duration-200`}
									>
										<Star className='h-5 w-5' />
									</button>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
									<button
										onClick={() => {
											setProductToDelete(product);
											setIsConfirmOpen(true);
										}}
										className='text-red-400 hover:text-red-300'
									>
										<Trash className='h-5 w-5' />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</motion.div>

			{/* Confirmation Modal */}
			{isConfirmOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-gray-900 p-6 rounded-lg shadow-lg w-80'>
						<h2 className='text-white text-lg font-semibold'>
							Confirm Deletion
						</h2>
						<p className='text-gray-400 mt-2'>
							Are you sure you want to delete{" "}
							<span className='text-white font-bold'>{productToDelete?.name}</span>?
						</p>
						<div className='mt-4 flex justify-end space-x-4'>
							<button
								onClick={() => setIsConfirmOpen(false)}
								className='bg-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-700'
							>
								Cancel
							</button>
							<button
								onClick={() => handleDelete(productToDelete._id)}
								className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
export default ProductsList;
