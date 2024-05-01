import Alert from 'react-bootstrap/Alert';

export default function BannerAlert() {
    const [show, setShow] = useState(true);
    
    return (
        <Alert variant="warning" onClose={() => setShow(false)} dismissible>
            Your ad would be here, but you dont have money
        </Alert>
    )
}