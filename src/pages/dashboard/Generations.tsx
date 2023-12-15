import React, { useEffect, useState } from 'react'
import axios from 'axios'

const INTERVAL = 5000

type SelectedItem = {
  description: string,
  ref: string,
  index: number,
  time: string
}

const Generations = () => {
  const [imageRequestsQueue, setImageRequestsQueue] = React.useState([])
  const [requestBeingGenerated, setRequestBeingGenerated] = React.useState<any>(null)
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null)

  const fetchGenerationQueueData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/imageRequestsQueue`)
      setImageRequestsQueue(data.imageRequestsQueue)
      setRequestBeingGenerated(data.requestBeingGenerated)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchGenerationQueueData()
    const interval = setInterval(() => {
      fetchGenerationQueueData()
    }, INTERVAL)

    return () => {
      clearInterval(interval)
    }
  }, []);

  function formatDateString(dateString: any) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} - ${hours}:${minutes}`;
  }

  const handleDelete = async () => {
    try {
      if (!selectedItem) return
      await axios.delete(`${process.env.REACT_APP_BASE_API_URL}/removeFromQueueByIndex/${selectedItem.index}`)
      setSelectedItem(null)
      fetchGenerationQueueData()
    } catch (e) {
      console.log(e)
    }
  }

  const renderDataTable = () => (
    <div className="container mx-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
        <tr>
          <th className="py-2 px-4 border-b text-left">Ref</th>
          <th className="py-2 px-4 border-b text-left">Opis</th>
          <th className="py-2 px-4 border-b text-left">Kreirano</th>
        </tr>
        </thead>
        <tbody>
        {imageRequestsQueue.map((item: any, index) => (
          <tr onClick={() => setSelectedItem({ ...item, index })} className={requestBeingGenerated && requestBeingGenerated.ref === item.ref ? 'bg-blue-100 cursor-pointer' : 'cursor-pointer'} key={item.ref}>
            <td className="py-2 px-4 border-b">{item.ref.substring(0, 4)}</td>
            <td className="py-2 px-4 border-b">{item.description.length > 50 ? `${item.description.substring(0, 50)}...` : item.description}</td>
            <td className="py-2 px-4 border-b">{formatDateString(item.time)}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )

  const Modal = ({ onClose, data }: any) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Potpuni podaci</h2>
          <p><strong>Reference:</strong> {data.ref}</p>
          <p><strong>Description:</strong> {data.description}</p>
          <p><strong>Time:</strong>{formatDateString(data.time)}</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Close
          </button>
          <button onClick={handleDelete} className="mt-4 ml-4 px-4 py-2 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderDataTable()}
      {selectedItem && (
        <Modal
          onClose={() => setSelectedItem(null)}
          data={selectedItem}
        />
      )}
    </div>
  );
};

export default Generations
