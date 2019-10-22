import React from 'react';
import Widget02 from '../../../Widgets/Widget02';
import model from '../OlapComponents/olapModelView';
import moment from 'moment';

const MAIN_URL = '/api/olap/actuality';

class ActualityWidget extends React.Component {
    state = {
        date: '-',
        actualColor: 'primary',
    };

    componentDidMount(): void {
        this.refreshData();
    }

    setActualColor = (strDate: string): string => {
        const date = moment(strDate, 'DD.MM.YYYY');
        const dayDiff = moment()
            .startOf('day')
            .diff(date, 'days');
        switch (dayDiff) {
            case 0:
                return 'primary';
            case 1:
                return 'warning';
            default:
                return 'danger';
        }
    };

    refreshData = () => {
        model.getData(MAIN_URL).then(data => {
            if (data && data.rows && data.rows.length > 0) {
                const value = data.rows[0][1].label;
                this.setState({
                    date: value,
                    actualColor: this.setActualColor(value),
                });
            }
        });
    };

    render() {
        return (
            <Widget02
                header={this.state.date}
                mainText="Актуальность"
                icon="fa fa-database"
                color={this.state.actualColor}
            />
        );
    }
}

export default ActualityWidget;
