```jsx
require('./style.sass')

const myTabs = [
    {
        value: '1',
        label: 'ONE 1'
    },
    {
        value: '2',
        label: 'TWO 2'
    },
    {
        value: '3',
        label: 'THREE 3'
    },
    {
        value: '4',
        label: 'FOUR 4'
    },
    {
        value: '5',
        label: 'FIVE 5'
    }
];

<SuTabs tabs={myTabs} tabClass='su-tabs' tabClassActive='su-tabs-active' onTabChange={handleTabChange}/>

function handleTabChange(selectedTab) {
    console.log(selectedTab)
}
```