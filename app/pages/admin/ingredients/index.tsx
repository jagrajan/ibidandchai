import { gql, useQuery } from '@apollo/client';
import React from 'react';
import DashboardLayout from '../../../components/layout/Dashboard';
import { Ingredient } from '../../../types/graphql/Ingredient';

const Dashboard: React.FC = () => {
  const { data } = useQuery<{ ingredient: Ingredient[] }>(gql`
      query {
          ingredient {
              id
              singular
              plural
          }
      }
  `);
  return (
    <DashboardLayout>
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Ingredients</h1>
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <button type="button"
                  className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3">
            Create
          </button>
        </div>
      </div>
      <div className="hidden mt-8 sm:block">
        <div className="align-middle inline-block min-w-full border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Singular</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plural</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
            {(data?.ingredient || []).map((ingredient) => (
              <tr key={ingredient.id}>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">
                  {ingredient.singular}
                </td>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">
                  {ingredient.plural}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
