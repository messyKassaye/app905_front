export const columns = [
    {
        id:1,
        minWidth: 150,
        label: 'Region,sub city or zone',
        format: value => value.toLocaleString(),
    },
    {
        id:2,
        minWidth: 200,
        label: 'Woreda',
        align:'left',
        format: value => value.toLocaleString(),
    },
    {
        id:'Specific names',
        minWidth: 350,
        label: 'Specific names',
        align:'left',
        format: value => value.toLocaleString(),
    },

]