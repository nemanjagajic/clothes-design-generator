import React from 'react'
import Generations from './Generations'
enum Tabs {
  GENERATIONS = 'GENERATIONS',
}

const DashboardHome = () => {
  const [selectedTab, setSelectedTab] = React.useState<Tabs>(Tabs.GENERATIONS)

  const renderNavbar = () => (
    <div className="flex flex-row hidden sm:inline-flex py-6 border border-b w-full">
      <div
        onClick={() => setSelectedTab(Tabs.GENERATIONS)}
        className={`flex justify-center items-center px-8 cursor-pointer ${selectedTab === Tabs.GENERATIONS && 'text-light-blue'}`}
      >
        Generisanja
      </div>
    </div>
  )

  return (
    <div>
      {renderNavbar()}
      {selectedTab === Tabs.GENERATIONS && <Generations />}
    </div>
  )
}

export default DashboardHome
