import { useSettingsContext } from "src/components/settings";
import Demo1 from "./demo/demo-1";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { apiShop } from "src/utils/api-shop";
import ScrollToTop from "src/components/scroll-to-top";
import { Fab } from "@mui/material";
import { Icon } from "@iconify/react";
import Header from "./header";
import Footer from "./footer";
import { MotionContainer } from "src/components/animate";

const getDemo = (num, common) => {
    if (num == 1)
        return <Demo1 {...common} />

}

const UserLayout = ({ children }) => {

    const router = useRouter();
    const { onChangeShopSetting, themeMode, themeDnsData } = useSettingsContext();

    useEffect(() => {
        getSettingData();
    }, [])
    const getSettingData = async () => {
        let result = await apiShop('', 'get');
        onChangeShopSetting(result);
    }
    if (!themeDnsData?.id) {
        return <></>
    }
    return (
        <>
            <MotionContainer style={{
                background: `${themeMode == 'dark' ? '#000' : '#fff'}`,
                color: `${themeMode == 'dark' ? '#fff' : '#000'}`,
            }}>
                <Header />
                {children}
                <Footer />
            </MotionContainer>
            <ScrollToTop className='mui-fixed'>
                <Fab size='small' aria-label='scroll back to top'>
                    <Icon icon='tabler:arrow-up' />
                </Fab>
            </ScrollToTop>
        </>
    )
}
export default UserLayout;