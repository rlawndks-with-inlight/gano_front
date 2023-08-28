import { Button } from '@mui/material';
import { m } from 'framer-motion'
import { useRouter } from 'next/router';
import { varFade } from 'src/components/animate';
import { Title, Wrappers } from 'src/components/elements/styled-components';

const PayComponent = () => {

    const router = useRouter();

    return (
        <>
            <Wrappers style={{
                height: '100vh',
            }}>

                <m.div variants={varFade().inRight}>
                    <Title style={{ marginBottom: '0' }}>결제가 <br />완료되었습니다.</Title>
                </m.div>
                <Button variant="contained" size="large" sx={{ margin: 'auto 0 1rem 0' }} onClick={()=>{
                    router.push('/')
                }}>홈으로</Button>

            </Wrappers>
        </>
    )
}
export default PayComponent;