import React, { PureComponent } from 'react';
import DimensionSelect from '../../components/multiselect/DimensionSelect/DimensionSelect';

class FilterHandler extends PureComponent {
    filters = this.props.defaultValues;

    handleChange = (hierarchyName, selectedValues) => {
        this.filters.set(hierarchyName, selectedValues);
        if (this.props.onChange) {
            this.props.onChange(this.filters);
        }
    };

    wrappedFilterElement = WrappedComponent => {
        return props => (
            <WrappedComponent
                {...props}
                onChange={this.handleChange}
                getSelectedValues={hName => this.props.defaultValues.get(hName)}
                forceCloseDropDown={this.props.stopFilterSelection}
            />
        );
    };

    WrappedSelect = this.wrappedFilterElement(DimensionSelect);
}

export default FilterHandler;
