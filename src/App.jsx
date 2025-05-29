import React, { useState, useEffect } from 'react';

function DataTable({ columns, data }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.accessor}>{col.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col.accessor}>{row[col.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const sampleInventory = [
  { id: '001', name: 'Chromebook', location: 'Room 201', quantity: 10 },
  { id: '002', name: 'Math Textbooks', location: 'Bookroom', quantity: 30 },
];

export default function InventoryApp() {
  const [inventory, setInventory] = useState(sampleInventory);
  const [itemId, setItemId] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleScan = () => {
    const existingItem = inventory.find(item => item.id === itemId && item.location === location);
    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
      setInventory([...inventory]);
    } else {
      setInventory([...inventory, {
        id: itemId,
        name: 'New Item',
        location,
        quantity: parseInt(quantity)
      }]);
    }
  };

  return (
    <div>
      <h1>School Inventory Management</h1>
      <input placeholder="Item ID" value={itemId} onChange={e => setItemId(e.target.value)} />
      <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
      <input placeholder="Quantity" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <button onClick={handleScan}>Add / Update Item</button>

      <DataTable columns={[
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Location', accessor: 'location' },
        { Header: 'Quantity', accessor: 'quantity' },
      ]} data={inventory} />
    </div>
  );
}
