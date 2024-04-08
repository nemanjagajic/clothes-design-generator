import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from './HistoryContext'
import HistoryItem from './HistoryItem'
import { SearchOutline } from 'react-ionicons'
import { useSwipeable } from 'react-swipeable'

type HistoryDrawerTypes = {
  isHistoryOpen: boolean
  onSurroundingAreaClicked: () => void
}

const HistoryDrawer = ({
  isHistoryOpen,
  onSurroundingAreaClicked,
}: HistoryDrawerTypes) => {
  const drawerRef = useRef<HTMLDivElement>(null)
  const { history, updateCurrentImages } = useHistory()

  const handlers = useSwipeable({
    onSwipedRight: (eventData) => {
      onSurroundingAreaClicked()
    },

    delta: 30,
  })

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target) &&
        !event.target.closest('#history-button')
      ) {
        onSurroundingAreaClicked()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [drawerRef])
  const [search, setSearch] = useState('')
  const searchResults = useMemo(() => {
    return history.filter((item) =>
      item.prompt.toLowerCase().includes(search.toLowerCase()),
    )
  }, [history, search])

  return (
    <div {...handlers}>
      <div
        ref={drawerRef}
        className={`fixed z-30 bg-white right-0 top-0 h-full w-[350px] shadow-xl transform ${
          isHistoryOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300`}
      >
        <h3 className="font-bold text-xl m-8">Istorija</h3>
        <div className="flex flex-col h-full w-full">
          <div className="overflow-y-auto h-[calc(100%-190px)] p-2">
            {!history.length && (
              <div className="w-full flex justify-center items-center mt-20">
                <p className="text-gray-600">Još uvek niste ništa kreirali</p>
              </div>
            )}
            {searchResults.map((item, index) => {
              return (
                <div
                  key={index}
                  className="border border-2 mb-4 rounded-md bg-gray-100 mx-4 "
                >
                  <HistoryItem item={item} />
                  <div className="bg-blue-500 w-full rounded-md text-white h-[40px] mt-2 flex items-center justify-center">
                    <button
                      onClick={() => {
                        updateCurrentImages(item.imageLinks)
                        onSurroundingAreaClicked()
                      }}
                    >
                      Primeni na majicu
                    </button>
                  </div>
                  <hr />
                </div>
              )
            })}
          </div>

          <div className="relative w-full px-6 mt-4">
            <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchOutline
                color={'#00000'}
                title={'Search'}
                height="25px"
                width="25px"
              />
            </div>

            <input
              type="text"
              value={search}
              placeholder={'Pretraži prethodne kreacije'}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              className="w-full pl-10 pr-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryDrawer
