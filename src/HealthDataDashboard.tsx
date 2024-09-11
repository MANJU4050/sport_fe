import { useState, useEffect } from 'react'
import { CheckIcon } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const devices = [
  { name: 'Google Fit', logo: '/placeholder.svg?height=30&width=30', constraints: ['steps', 'sleep', 'heartbeat'] },
  { name: 'Apple Health', logo: '/placeholder.svg?height=30&width=30', constraints: ['steps', 'sleep', 'heartbeat', 'calories'] },
  { name: 'Whoop', logo: '/placeholder.svg?height=30&width=30', constraints: ['sleep', 'heartbeat', 'pressure'] },
  { name: 'Oura', logo: '/placeholder.svg?height=30&width=30', constraints: ['sleep', 'heartbeat'] },
  { name: 'Fitbit', logo: '/placeholder.svg?height=30&width=30', constraints: ['steps', 'sleep', 'heartbeat', 'calories'] },
  { name: 'Garmin', logo: '/placeholder.svg?height=30&width=30', constraints: ['steps', 'sleep', 'heartbeat', 'pressure', 'calories'] },
]

const constraints = ['steps', 'sleep', 'heartbeat', 'pressure', 'water', 'calories']

const timeRanges = ['1 Month', '1 Week', '6 Months', '1 Year']

const generateMockData = (constraint: string, device: string, range: string) => {
  const data = []
  const days = range === '1 Week' ? 7 : range === '1 Month' ? 30 : range === '6 Months' ? 180 : 365
  for (let i = 0; i < days; i++) {
    data.push(Math.floor(Math.random() * 10000))
  }
  return data
}

export default function HealthDataDashboard() {
  const [selectedConstraint, setSelectedConstraint] = useState('')
  const [graphs, setGraphs] = useState<{
    [key: string]: {
      devices: string[];
      timeRange: string;
      data: any[];
      labels: string[];
    }
  }>({})

  const handleConstraintClick = (constraint: string) => {
    setSelectedConstraint(constraint)
    if (!graphs[constraint]) {
      setGraphs(prev => ({
        ...prev,
        [constraint]: {
          devices: [],
          timeRange: '1 Month',
          data: [],
          labels: []
        }
      }))
    }
  }

  const handleDeviceClick = (device: string) => {
    if (!selectedConstraint) return

    setGraphs(prev => {
      const currentGraph = prev[selectedConstraint] || { devices: [], timeRange: '1 Month', data: [], labels: [] }
      const updatedDevices = currentGraph.devices.includes(device)
        ? currentGraph.devices.filter(d => d !== device)
        : [...currentGraph.devices, device]

      return {
        ...prev,
        [selectedConstraint]: {
          ...currentGraph,
          devices: updatedDevices
        }
      }
    })
  }

  const updateGraphData = (constraint: string) => {
    setGraphs(prev => {
      const currentGraph = prev[constraint]
      if (!currentGraph || currentGraph.devices.length === 0) {
        // If no graph or no devices are selected, remove the graph
        const { [constraint]: _, ...rest } = prev
        return rest
      }

      const updatedData = currentGraph.devices.map((device, index) => ({
        label: `${device} - ${constraint}`,
        data: generateMockData(constraint, device, currentGraph.timeRange),
        borderColor: `hsl(${index * 60}, 70%, 50%)`,
        backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.5)`,
      }))

      const updatedLabels = Array.from(
        { length: currentGraph.timeRange === '1 Week' ? 7 : currentGraph.timeRange === '1 Month' ? 30 : currentGraph.timeRange === '6 Months' ? 180 : 365 },
        (_, i) => `Day ${i + 1}`
      )

      return {
        ...prev,
        [constraint]: {
          ...currentGraph,
          data: updatedData,
          labels: updatedLabels
        }
      }
    })
  }

  useEffect(() => {
    if (selectedConstraint && graphs[selectedConstraint]) {
      updateGraphData(selectedConstraint)
    }
  }, [selectedConstraint, graphs[selectedConstraint]?.devices, graphs[selectedConstraint]?.timeRange])

  const handleTimeRangeChange = (constraint: string, newRange: string) => {
    setSelectedConstraint(constraint) // Update the selected constraint
    setGraphs(prev => ({
      ...prev,
      [constraint]: {
        ...(prev[constraint] || { devices: [], data: [], labels: [] }),
        timeRange: newRange
      }
    }))
  }

  const filteredDevices = devices.filter(device => device.constraints.includes(selectedConstraint))

  const getChartOptions = (constraint: string): ChartOptions<'line'> => ({
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days',
        },
      },
      y: {
        title: {
          display: true,
          text: constraint.charAt(0).toUpperCase() + constraint.slice(1),
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${constraint.charAt(0).toUpperCase() + constraint.slice(1)} Data`,
      },
    },
  })

  // Sort graphs to ensure the selected constraint's graph is first
  const sortedGraphs = Object.entries(graphs).sort(([a], [b]) => {
    if (a === selectedConstraint) return -1;
    if (b === selectedConstraint) return 1;
    return 0;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Health Data Dashboard</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {constraints.map(constraint => (
          <button
            key={constraint}
            onClick={() => handleConstraintClick(constraint)}
            className={`px-4 py-2 rounded ${
              selectedConstraint === constraint ? 'bg-primary text-white bg-gray-700' : 'bg-secondary text-secondary-foreground'
            }`}
          >
            {constraint}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        <div className="w-1/4">
          <h2 className="text-xl font-semibold mb-2">Smart Devices</h2>
          {filteredDevices.map(device => (
            <div key={device.name} className="flex items-center gap-2 mb-2">
              <button
                onClick={() => handleDeviceClick(device.name)}
                className={`w-6 h-6 rounded flex items-center justify-center ${
                  graphs[selectedConstraint]?.devices.includes(device.name)
                    ? 'bg-primary text-primary-foreground bg-gray-900 text-white'
                    : 'bg-secondary text-secondary-foreground bg-gray-900'
                }`}
              >
                {graphs[selectedConstraint]?.devices.includes(device.name) && <CheckIcon className="w-4 h-4" />}
              </button>
              <span>{device.name}</span>
            </div>
          ))}
        </div>
        <div className="w-3/4">
          {sortedGraphs.length > 0 ? (
            sortedGraphs.map(([constraint, graph]) => (
              <div key={constraint} className="mb-8">
                <h3 className="text-lg font-semibold mb-2">
                  {constraint.charAt(0).toUpperCase() + constraint.slice(1)} - {graph.devices.join(', ')}
                </h3>

                <div className="flex justify-end gap-2 mb-4">
                  {timeRanges.map(range => (
                    <button
                      key={range}
                      onClick={() => handleTimeRangeChange(constraint, range)}
                      className={`px-4 py-2 rounded ${
                        graph.timeRange === range
                          ? 'bg-primary text-primary-foreground bg-gray-700 text-white'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                <div className="bg-card text-card-foreground rounded-lg p-4">
                  <Line options={getChartOptions(constraint)} data={{ labels: graph.labels, datasets: graph.data }} />
                </div>
              </div>
            ))
          ) : (
            <p>No data available. Select a constraint and devices to display graphs.</p>
          )}
        </div>
      </div>
    </div>
  )
}