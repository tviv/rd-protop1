import React, { ReactNode, SFC } from 'react';
import Widget02 from '../../../Widgets/Widget02';
import model from '../OlapComponents/olapModelView';

const MAIN_URL = '/api/olap/actuality';

class ActualityWidget extends React.Component {

    state = {
        date: '-',
    };

    componentDidMount(): void {
        this.refreshData();
    }

    refreshData = () => {
        model.getData(MAIN_URL).then(data => {
            if (data && data.rows && data.rows.length > 0) {
                this.setState({date: data.rows[0][1].label});
            }
        });
    };

    render() {
        return (
            <Widget02
                header={this.state.date}
                mainText="Актуальность"
                icon="fa fa-database"
                color="primary"
            />
        );
    }
}

export default ActualityWidget;
