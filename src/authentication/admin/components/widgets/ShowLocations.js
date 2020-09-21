import React from 'react'
import {showMainDialog} from '../../state/actions/dialogAction'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { Table, TableHead ,TableRow,TableCell,TableBody} from '@material-ui/core'
import {columns} from '../../data/columns'

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#3C4252',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

class ShowLocation extends React.Component{

    render(){
        return (
            <div>
                <Table>
                 <TableHead>
                  <TableRow>
                   {columns.map(column => (
                     <StyledTableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                      </StyledTableCell>
                        ))}
                     </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            {`${this.props.district.region[0].region_name},${this.props.district.sub_city_zone[0].sub_city_zone_name}`}
                        </TableCell>

                        <TableCell>
                            {
                                `${this.props.district.woreda
                                    .map(woreda=>{
                                    return woreda.name
                                     })},`
                            }
                        </TableCell>

                        <TableCell>
                            {
                                `${this.props.district.specific_name
                                    .map(woreda=>{
                                    return woreda.name
                                     })},`
                            }
                        </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </div>
        )
    }
}

export default connect(null,{showMainDialog})(ShowLocation)