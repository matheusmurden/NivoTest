import dataByQuarter from '../dataByQuarter.json'
import dataByMonth from '../dataByMonth.json'
import { useState, useEffect } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'

import { Label } from '@tidbits/react-tidbits/Form';
import { Select, Checkbox } from '@tidbits/react-tidbits/Input';
import { Button } from '@tidbits/react-tidbits';


function App() {

  const [indexBy, setIndexBy] = useState('QUARTER')
  const [data, setData] = useState(undefined)
  const [pieData, setPieData] = useState([])
  const [pieDetail, setPieDetail] = useState([])

  const [keysToDisplay, setKeysToDisplay] = useState([
            'AWS',
            'GCP',
            'KUBE'
        ])

  const manageKeysToDisplay = (key, shouldDisplayKey) => {
    console.log(shouldDisplayKey)
    shouldDisplayKey
    ? setKeysToDisplay([...keysToDisplay, key])
    : setKeysToDisplay(keysToDisplay.filter(i => i!== key))
  }

  const hideBarGraph = (e) => {
    const mappedData = Object.entries(e.data).map(([key, value]) => {
      if(key !== indexBy) {
        return { id: key, value }
      }
    }).filter(i => !!i)

    setPieDetail(e.data[indexBy])
    setPieData(mappedData)
  }

  const hidePieGraph = () => {
    setPieData([])
    setPieDetail(undefined)
  }

  useEffect(() => {
    const availableData = {
      'QUARTER': dataByQuarter,
      'MONTH': dataByMonth
    }

    const mappedData = availableData[indexBy].map((original) => {
      let mappedRecord = {
        [indexBy]: original[indexBy]
      }
      keysToDisplay.forEach((key) => {
        mappedRecord[key] = original[key]
      })
      return mappedRecord
    })

    setData(mappedData)
  }, [indexBy, keysToDisplay, dataByMonth, dataByQuarter])

  return (
    <main>
      <div style={{display: 'flex'}}>
    {!pieDetail ? 
    <>
    <form style={{marginRight: '1.5rem'}}>
      <Label>View data by:
        <Select onChange={(e) => setIndexBy(e.target.value)}>
          <option value="QUARTER">Quarter</option>
          <option value="MONTH">Month</option>
        </Select>
      </Label>
    </form>
    <form style={{display: 'flex', alignSelf: 'flex-end'}}>
      <Label style={{marginRight: '0.5rem'}}>
        Services to display:
      </Label>
      <Label style={{marginRight: '0.5rem'}}>
        <Checkbox defaultChecked onChange={(e) => manageKeysToDisplay('AWS', e.target.checked)}/> AWS
      </Label>
      <Label style={{marginRight: '0.5rem'}}>
        <Checkbox defaultChecked onChange={(e) => manageKeysToDisplay('GCP', e.target.checked)}/> GCP
      </Label>
      <Label style={{marginRight: '0.5rem'}}>
        <Checkbox defaultChecked onChange={(e) => manageKeysToDisplay('KUBE', e.target.checked)}/> KUBE
      </Label>
    </form>
    </>
  : 
  <>
    <Button style={{marginRight: '1.5rem'}} onClick={() => hidePieGraph()}>Go back</Button>
    <Label style={{fontWeight: 'bold', alignSelf: 'flex-end'}}>
      Showing details for {indexBy.toLocaleLowerCase()} {pieDetail}
    </Label> 
  </> 
  }
    
    </div>
      
    {!pieData.length ? (
    <ResponsiveBar
        onClick={(e) => hideBarGraph(e)}
        data={data}
        keys={keysToDisplay}
        indexBy={indexBy}
        valueFormat={(value) =>
          Number(value).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          style: 'currency',
          currency: 'USD'
        })}
        margin={{ top: 50, right: 130, bottom: 50, left: 100 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'pastel1' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: indexBy,
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'COST',
            legendPosition: 'middle',
            legendOffset: -80
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2.7
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                translateX: 120,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                symbolSize: 20,
                itemDirection: 'left-to-right',
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
    )
  : (
      <ResponsivePie
        onClick={() => hidePieGraph()}
        data={pieData}
        indexBy={indexBy}
        valueFormat={(value) =>
          Number(value).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          style: 'currency',
          currency: 'USD'
        })}
        margin={{ top: 100, right: 130, bottom: 150, left: 60 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={4}
        activeOuterRadiusOffset={8}
        borderWidth={0}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        colors={{ scheme: 'pastel1' }}
        legends={[
              {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 20,
                  symbolShape: 'circle',
              }
            ]}
      
      />
  )
  }
    </main>
  )
}

export default App
