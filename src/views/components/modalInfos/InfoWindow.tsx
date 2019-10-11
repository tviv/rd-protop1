import React, { Component, ReactNode } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



interface Props {
    title: string;
    body: ReactNode | string;
    element?: ReactNode;
    isLarge?: boolean;
    translation?: {
        cancel: string;
    };
}

type State = {
    modal: boolean;
};

class InfoWindow extends Component<Props, State> {
    static defaultProps = {
        title: 'Some Info',
        element: <button>info</button>,
        isLarge: false,
    };

    state = {
        modal: false,
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    render() {
        const { title, element, body, isLarge, translation } = this.props;

        return (
            <React.Fragment>
                <span onClick={this.toggle}>{element}</span>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={'modal-info ' + (isLarge ? 'modal-lg' : '')}
                >
                    <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                    <ModalBody>{body}</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>
                            {(translation && translation.cancel) || 'Cancel'}
                        </Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

export default InfoWindow;
