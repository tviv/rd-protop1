import DimensionSelect from './DimensionSelect'

it('ungrouping', () => {

  let data = [
    {label: 'All', children: [
        {label: '1', children:[{label:'1.1'}, {label:'1.2'}]},
        {label: '2'},
        {label: '3', children:[{label:'3.1'}]},
        {label: '4'}
      ]}
  ]

  let ds = new DimensionSelect({data: data});
  let res = ds.ungroup(data, data[0], data)

  expect(res.length).toEqual(4);
  expect(res[2].label).toEqual('3')

})
