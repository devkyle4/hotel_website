import { useState } from 'react'
import { Search, Wine, Trash2, Edit2, Eye, Plus } from 'lucide-react'

interface Drink {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  available: boolean;
}

export default function DrinksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingDrink, setEditingDrink] = useState<Drink | null>(null);

  //Sample Data
  const [drinks] = useState<Drink[]>([
    { id: '1', name: 'Mojito', category: 'Cocktails', price: 12.50, stock: 45, available: true },
    { id: '2', name: 'Tequila', category: 'Spirit', price: 40.00, stock: 10, available: true },
    { id: '3', name: 'Red Wine', category: 'Wine', price: 25.00, stock: 30, available: true },
    { id: '4', name: 'Craft Beer', category: 'Beer', price: 8.00, stock: 120, available: true },
    { id: '5', name: 'Whiskey Sour', category: 'Cocktails', price: 15.00, stock: 0, available: false },
    { id: '6', name: 'Coca Cola', category: 'Soft Drinks', price: 3.50, stock: 200, available: true },
  ]);

  const categories = ['all', 'Cocktails', 'Wine', 'Beer', 'Soft Drinks', 'Spirits']

  const filteredDrinks = drinks.filter(drink => {
    const matchesSearch = drink.name.toLowerCase().includes(searchTerm.toLowerCase()) || drink.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || drink.category === filterCategory;

    return matchesCategory && matchesSearch
  })

  const handleAddNew = () => {
    setEditingDrink(null);
    setShowModal(true)
  }

  const handleEdit = (drink: Drink) => {
    setEditingDrink(drink)
    setShowModal(true)
  }

  return (
    <div className='space-y-6'>
      { /* Header */}
      <div>
        <h1 className="text-3x1 font-bold text-gray-900 dark:text-white">Drinks</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your pub drink catalog</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type='text'
            placeholder='Search drinks...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>

        <div className="flex gap-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className='px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500'
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          <button onClick={handleAddNew} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className='w-5 h-5' />
            New Drink
          </button>
        </div>
      </div>

      {/* Drinks Table */}
      <div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Drink Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDrinks.map((drink) => (
                <tr key={drink.id} className='hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors'>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className='flex items-center'>
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                        <Wine className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{drink.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">{drink.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">${drink.price.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${drink.stock === 0 ? 'text-red-600' :
                      drink.stock < 20 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                      {drink.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${drink.available
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                      {drink.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(drink)}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingDrink ? 'Edit Drink' : 'Add New Drink'}
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Drink Name
                  </label>
                  <input
                    type="text"
                    defaultValue={editingDrink?.name}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Mojito"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    defaultValue={editingDrink?.category}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select category</option>
                    <option value="Cocktails">Cocktails</option>
                    <option value="Wine">Wine</option>
                    <option value="Beer">Beer</option>
                    <option value="Soft Drinks">Soft Drinks</option>
                    <option value="Spirits">Spirits</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price (Ghc)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={editingDrink?.price}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Stock (units)
                  </label>
                  <input
                    type="number"
                    defaultValue={editingDrink?.stock}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="available"
                  defaultChecked={editingDrink?.available ?? true}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="available" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Available for sale
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingDrink ? 'Update Drink' : 'Add Drink'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className='text-sm text-gray-600 dark:text-gray-400'>Total Drinks</p>
              <p className='text-2xl font-bold text-gray-900 dark:text-white mt-1'>48</p>
            </div>
            <Wine className='w-8 h-8 text-blue-600' />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">5</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock</p>
              <p className="text-2xl font-bold text-red-600 mt-1">3</p>
            </div>
          </div>
        </div>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between'>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Unavailable</p>
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-400 mt-1">1</p>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}
