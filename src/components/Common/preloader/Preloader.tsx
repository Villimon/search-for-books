import Loader from '../../../assets/images/preloader.gif';

const Preloader = () => {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <img width={80} src={Loader} />
        </div>
    )
}


export default Preloader;