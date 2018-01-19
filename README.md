# iothon-serverside
IoThon serverside code. The project expects a BLE gateway to send BLE advertisements via HTTP post. 
If the header of BLE data matches the encrypted RuuviTag data, advertisement is encoded into trinary
and sent to the Tangle.

# Installing
Git clone this repository, run `npm install`, and run `node index.js`.

# Usage
The project expects data to be posted via HTTP in JSON format to port 5375. Example data:

```
 [ { timestamp: '2017-12-28T12:33:38Z',
    type: 'Unknown',
    mac: 'D6A911ADA763',
    bleName: '',
    rssi: -29,
    rawData: '02010415FF990403401713B9CC001CFFF804080BC50000000000' },
  { timestamp: '2017-12-28T12:33:38Z',
    type: 'Unknown',
    mac: 'D6A911ADA763',
    bleName: '',
    rssi: -39,
    rawData: '02010415FF990403401713B9CC001CFFF804080BC50000000000' },
  { timestamp: '2017-12-28T12:33:40Z',
    type: 'Unknown',
    mac: 'D6A911ADA763',
    bleName: '',
    rssi: -40,
    rawData: '02010415FF990403401712B9CB0020FFFC04000BC50000000000' } ]
```

Where 
 * _timestamp_ is the gateway time at the time advertisement was received.
 * _type_ is the type of data as interpreted by the gateway, "Unknown" in our case.
 * _bleName_ is advertised name of beacon
 * _mac_ is MAC address of the BLE device
 * _rssi_ is signal strength
 * _rawData_ is the manufacturer specific data sent by beacon.

The data gets sent as 0-value IOTA transaction to address `999999999999999999999999999999999999999999999999999999999999999999FILTERAESIOTHON`
if the data has header of `0201061BFF990406`. 