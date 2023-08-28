 import { Button, Dialog, Drawer, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { Col, InputTitle, Row, SmallTitle, Title, Wrappers, themeObj } from "src/components/elements/styled-components";
import { m } from 'framer-motion'
import BlankLayout from "src/layouts/blank/BlankLayout";
import { varFade } from "src/components/animate";
import { Icon } from "@iconify/react";
import $ from 'jquery';
import { useEffect } from "react";
import _, { shuffle } from "lodash";
import { Countdown } from "src/utils/function";
import { useRef } from "react";
const formatActiveStepTitle = (title, sub_title) => {
    return {
        title,
        sub_title
    }
}
const formatTermsAndConditionsList = (title, content) => {
    return {
        title,
        content
    }
}
const news_agency_type_list = [
    'SKT',
    'KT',
    'LG U+',
    'SKT 알뜰폰',
    'KT 알뜰폰',
    'LG U+알뜰폰',
]
const terms_and_conditions_list = [
    formatTermsAndConditionsList('가나다라마바'),
    formatTermsAndConditionsList('가나다라마바'),
    formatTermsAndConditionsList('가나다라마바'),
    formatTermsAndConditionsList('가나다라마바사(선택)'),
]
const SignUp = () => {

    const router = useRouter();
    const [windowStep, setWindowStep] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [selectNewsAgencyOpen, setSelectNewsAgencyOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(-1);
    const [isInPage, setIsInPage] = useState(false);
    const accountNumberBackRef = useRef();
    const [item, setItem] = useState({
        user_name: '',
        user_pw: '',
        name: '',
        account_number_front: '',
        account_number_back: '',
        news_agency_type: undefined,//통신사
        phone: '',
        phone_check_num: '',//휴대폰인증번호
        terms_and_conditions_list: [],
        auth_pw: '',
        auth_pw_check: '',
    })
    const activeStepTitle = {
        0: formatActiveStepTitle('이름입력', '본인확인을 위해 본명을 입력해주세요'),
        1: formatActiveStepTitle('주민등록번호 입력'),
        2: formatActiveStepTitle('통신사 선택'),
        3: formatActiveStepTitle('휴대폰 번호 입력'),
        4: formatActiveStepTitle('입력한 정보확인'),
    }
    const isDisableButton = () => {
        let is_name = item?.name?.length >= 2;
        let is_account_number = item?.account_number_front?.length >= 6 && item?.account_number_back >= 1;
        let is_news_agency = news_agency_type_list[item?.news_agency_type];
        let is_phone = item?.phone?.length >= 13;
        let is_phone_check_num = item?.phone_check_num?.length == 6
        let is_auth_pw = item?.auth_pw?.length == 6
        if (activeStep == 0) {
            if (is_name) {
                return false;
            }
        }
        if (activeStep == 1) {
            if (is_name && is_account_number) {
                setActiveStep(2);

            }
        }
        if (activeStep == 2) {
            if (is_name && is_account_number && is_news_agency) {
                setActiveStep(3);
            }
        }
        if (activeStep == 3) {
            if (is_name && is_account_number && is_news_agency && is_phone) {
                setActiveStep(4);
            }
        }
        if (activeStep == 4) {
            return false;
        }
        if (activeStep == 5) {
            if (item.terms_and_conditions_list.includes(0) && item.terms_and_conditions_list.includes(1) && item.terms_and_conditions_list.includes(2)) {
                return false;
            }
        }
        if (activeStep == 6) {
            if (is_phone_check_num) {
                return false;
            }
        }
        if (activeStep == 7) {
            if (is_auth_pw) {
                setActiveStep(8);
            }
        }

        return true;
    }
    useEffect(() => {
        setIsInPage(true);
    }, [])
    useEffect(() => {
        isDisableButton();
    }, [item])
    useEffect(() => {
        if (activeStep <= 4) {
            setWindowStep(0);
        } else if (activeStep <= 5) {
            setWindowStep(1);
            setSelectNewsAgencyOpen('terms_and_conditions');
        } else if (activeStep <= 7) {
            setWindowStep(2);
            if (activeStep == 6) {
                sendPhoneCheckNumSms();
            }
        }


    }, [activeStep])
    const onClickNextStep = async () => {
        if (activeStep == 4) {
            setWindowStep(1);
        }
        if (activeStep == 6) {
            let result = await onCheckPhoneCheckNum();
            if (!result) {
                return false;
            }
        }
        setActiveStep(activeStep + 1);
    }
   
    useEffect(() => {

    }, [timeLeft])
    const sendPhoneCheckNumSms = () => {

        setTimeLeft(180);
    }
    const onCheckPhoneCheckNum = () => {

        return true;
    }
    return (
        <>
            <Wrappers style={{
                height: '100vh',
            }}>
                {windowStep == 0 &&
                    <>
                        <Title style={{ marginBottom: '0' }}>{activeStepTitle[activeStep]?.title}</Title>

                        {activeStepTitle[activeStep]?.sub_title &&
                            <>
                                <SmallTitle>{activeStepTitle[activeStep]?.sub_title}</SmallTitle>
                            </>}
                        {activeStep >= 3 &&
                            <> 
                                <m.div variants={varFade().inRight} style={{ marginTop: '1rem' }}>
                                    <InputTitle>휴대폰 번호</InputTitle>
                                    <TextField
                                        variant="standard"
                                        sx={{ width: '100%' }}
                                        placeholder="휴대폰 번호 입력"
                                        inputProps={{
                                            style: {
                                                padding: '1rem 0.5rem'
                                            },
                                            maxLength: '13'
                                        }}
                                        value={item.phone}
                                        onChange={(e) => {
                                            let { value } = e.target;
                                            if (isNaN(parseInt(value[value.length - 1])) && value[value.length - 1] != '-' && value.length > 0) {

                                            } else {
                                                if (value.length == 3) {
                                                    if (value.length > item.phone.length) {
                                                        value += '-';
                                                    } else {
                                                        value = value.substring(0, value.length - 1);
                                                    }
                                                }
                                                if (value.length == 8) {
                                                    if (value.length > item.phone.length) {
                                                        value += '-';
                                                    } else {
                                                        value = value.substring(0, value.length - 1);
                                                    }
                                                }

                                                setItem({
                                                    ...item,
                                                    ['phone']: value
                                                })
                                            }

                                        }}
                                    />
                                </m.div>
                            </>}
                        {activeStep >= 2 &&
                            <>
                                <m.div variants={varFade().inRight} style={{ marginTop: '1rem' }}>
                                    <InputTitle>통신사</InputTitle>
                                    <TextField
                                        variant="standard"
                                        sx={{ width: '100%' }}
                                        placeholder="통신사 선택"
                                        inputProps={{
                                            style: {
                                                padding: '1rem 0.5rem'
                                            },
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <Icon icon={'ps:down'} style={{ margin: '0.5rem' }} />
                                            ),
                                            readOnly: true
                                        }}
                                        value={news_agency_type_list[item.news_agency_type]}
                                        onClick={() => {
                                            setSelectNewsAgencyOpen('news_agency_type');
                                        }}
                                        readOnly={true}
                                    />
                                </m.div>
                            </>}
                        {activeStep >= 1 &&
                            <>
                                <m.div variants={varFade().inRight} style={{ marginTop: '1rem' }}>
                                    <InputTitle>주민등록번호</InputTitle>
                                    <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                        <TextField
                                            variant="standard"
                                            sx={{ width: '45%' }}
                                            placeholder=""
                                            inputProps={{
                                                style: {
                                                    padding: '1rem 0.5rem'
                                                },
                                            }}
                                            value={item.account_number_front}
                                            type="number"
                                            onChange={(e) => {
                                                if (e.target.value.length > 6) {
                                                    return;
                                                }
                                                let { value } = e.target;
                                                setItem({
                                                    ...item,
                                                    ['account_number_front']: value
                                                })
                                                console.log((value.toString().length == 6))
                                                if (value.toString().length == 6) {
                                                    accountNumberBackRef.current.focus();
                                                }
                                            }}
                                        />
                                        <div style={{ minWidth: '50px', textAlign: 'center' }}>
                                            <Icon icon={'pepicons-pop:line-x'} />
                                        </div>
                                        <TextField
                                            ref={accountNumberBackRef}
                                            variant="standard"
                                            sx={{ width: '36px' }}
                                            inputProps={{
                                                style: {
                                                    padding: '1rem 0.5rem'
                                                },
                                            }}
                                            type="number"
                                            value={item.account_number_back}

                                            onChange={(e) => {
                                                if (e.target.value.length > 1) {
                                                    return;
                                                }
                                                setItem({
                                                    ...item,
                                                    ['account_number_back']: e.target.value
                                                })
                                            }}
                                        />
                                        <div style={{ width: '45%', fontSize: '28px', color: '#637381' }}>
                                            ●●●●●●
                                        </div>
                                    </Row>
                                </m.div>
                            </>}
                        {activeStep >= 0 &&
                            <>
                                <m.div variants={varFade().inRight} style={{ marginTop: '1rem' }}>
                                    <InputTitle>이름</InputTitle>
                                    <TextField
                                        variant="standard"
                                        sx={{ width: '100%' }}
                                        placeholder="사용자 본명 입력"
                                        inputProps={{
                                            style: {
                                                padding: '1rem 0.5rem'
                                            }
                                        }}
                                        value={item.name}
                                        onChange={(e) => {
                                            setItem({
                                                ...item,
                                                ['name']: e.target.value
                                            })
                                        }}
                                    />
                                </m.div>
                            </>}
                    </>}
                {windowStep == 1 &&
                    <>
                        {/* 약관동의 팝업 activeStep==5 */}
                    </>}
                {windowStep == 2 &&
                    <>
                        {activeStep == 6 &&
                            <>
                                <Row style={{ padding: '1rem 0' }}>
                                    <Icon icon={'ooui:previous-ltr'} style={{ fontSize: '36px' }} onClick={() => {
                                        setActiveStep(activeStep - 1);
                                    }} />
                                </Row>
                                <Col>
                                    <div style={{ fontSize: themeObj.font_size.size5 }}>인증번호 입력</div>
                                </Col>
                                <m.div variants={varFade().inRight} style={{ marginTop: '1rem' }}>
                                    <InputTitle>인증번호</InputTitle>
                                    <Row>
                                        <Col
                                            style={{ width: '100%' }}
                                        >
                                            <TextField
                                                variant="standard"
                                                sx={{ width: '100%' }}
                                                placeholder="6자리 숫자입력"
                                                inputProps={{
                                                    style: {
                                                        padding: '1rem 0.5rem'
                                                    },
                                                    maxLength: '6'
                                                }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <>
                                                            <Countdown
                                                                seconds={180}
                                                                timeLeft={timeLeft}
                                                                setTimeLeft={setTimeLeft}
                                                                style={{
                                                                    fontSize: '20px'
                                                                }}
                                                            />
                                                        </>
                                                    ),
                                                }}
                                                type="number"
                                                value={item.phone_check_num}
                                                onChange={(e) => {
                                                    if (e.target.value.length > 6) {
                                                        return;
                                                    }
                                                    setItem({
                                                        ...item,
                                                        ['phone_check_num']: e.target.value
                                                    })
                                                }}
                                            />
                                            <div style={{
                                                fontSize: themeObj.font_size.size8,
                                                padding: '1rem'
                                            }}>인증번호가 오지 않나요?</div>
                                        </Col>
                                        <Button
                                            style={{ background: themeObj.main_color.color3, fontSize: themeObj.font_size.size11, width: '112px', marginLeft: '0.5rem', height: '55px' }}
                                            variant="contained"
                                            onClick={sendPhoneCheckNumSms}
                                        >
                                            <Col>
                                                <div>인증번호</div>
                                                <div>재요청</div>
                                            </Col>
                                        </Button>
                                    </Row>

                                </m.div>
                            </>}
                        {(activeStep == 7 || activeStep == 8) &&
                            <>
                                <m.div variants={varFade().inRight} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', margin: 'auto', height: '100vh' }}>
                                    <Col style={{ margin: '20vh auto 0 auto', alignItems: 'center', fontWeight: 'bold', fontSize: themeObj.font_size.size6 }}>
                                        <div>{activeStep == '7' ? '사용할 비밀번호를' : '확인을 위해 다시 한번'}</div>
                                        <div>입력해 주세요</div>
                                    </Col>
                                    <Row style={{ columnGap: '1rem', margin: '2rem auto auto auto', maxWidth: '500px', justifyContent: 'space-between', width: '100%' }}>
                                        <TextField
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            inputProps={{
                                                style: {
                                                    textAlign: 'center'
                                                }
                                            }}
                                            variant="standard"
                                            value={item[activeStep == 7 ? 'auth_pw' : 'auth_pw_check'].substring(0, 1)}
                                        />
                                        <TextField
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            inputProps={{
                                                style: {
                                                    textAlign: 'center'
                                                }
                                            }}
                                            value={item[activeStep == 7 ? 'auth_pw' : 'auth_pw_check'].substring(1, 2)}
                                            variant="standard"
                                        />
                                        <TextField
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            inputProps={{
                                                style: {
                                                    textAlign: 'center'
                                                }
                                            }}
                                            value={item[activeStep == 7 ? 'auth_pw' : 'auth_pw_check'].substring(2, 3)}
                                            variant="standard"
                                        />
                                        <TextField
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            inputProps={{
                                                style: {
                                                    textAlign: 'center'
                                                }
                                            }}
                                            value={item[activeStep == 7 ? 'auth_pw' : 'auth_pw_check'].substring(3, 4)}
                                            variant="standard"
                                        />
                                        <TextField
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            inputProps={{
                                                style: {
                                                    textAlign: 'center'
                                                }
                                            }}
                                            value={item[activeStep == 7 ? 'auth_pw' : 'auth_pw_check'].substring(4, 5)}
                                            variant="standard"
                                        />
                                        <TextField
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            inputProps={{
                                                style: {
                                                    textAlign: 'center'
                                                }
                                            }}
                                            value={item[activeStep == 7 ? 'auth_pw' : 'auth_pw_check'].substring(5, 6)}
                                            variant="standard"
                                        />
                                    </Row>
                                    <Row style={{
                                        position: 'fixed',
                                        bottom: '0',
                                        left: '0',
                                        width: '100%',
                                    }}>
                                        <Row style={{
                                            background: themeObj.main_color.color2,
                                            margin: 'auto',
                                            maxWidth: '500px',
                                            flexWrap: 'wrap',
                                        }}>
                                            {shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '', '']).map((itm) => (
                                                <>
                                                    <Button style={{ width: '25%', height: '72px' }}
                                                        disabled={typeof itm != 'number'}
                                                        onClick={() => {
                                                            if (activeStep == 7) {
                                                                setItem({
                                                                    ...item,
                                                                    auth_pw: item.auth_pw + itm
                                                                })
                                                            } else {
                                                                setItem({
                                                                    ...item,
                                                                    auth_pw_check: item.auth_pw_check + itm
                                                                })
                                                            }
                                                        }}
                                                    >
                                                        {itm}
                                                    </Button>
                                                </>
                                            ))}
                                        </Row>
                                    </Row>
                                </m.div>
                            </>}

                    </>}
                {activeStep != 7 && activeStep != 8 &&
                    <>
                        <Button variant="contained" size="large" sx={{ margin: 'auto 0 1rem 0' }} disabled={isDisableButton()} onClick={onClickNextStep}>다음</Button>
                    </>}
            </Wrappers>
            <Drawer
                anchor={'bottom'}
                open={selectNewsAgencyOpen}
                onClose={() => {
                    if (selectNewsAgencyOpen == 'terms_and_conditions') {
                        setActiveStep(4);
                    }
                    setSelectNewsAgencyOpen(false);
                }}
                disableScrollLock={true}
                sx={{
                    width: '100vw',
                }}
                BackdropProps={{
                    style: {
                        opacity: 0.5
                    }
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: themeObj.main_color.color2,
                        maxWidth: '840px',
                        width: '100%',
                        minHeight: '200px',
                        margin: '0 auto',
                        borderTopLeftRadius: '24px',
                        borderTopRightRadius: '24px',
                        paddingBottom: '1rem',
                        position: 'fixed',
                    }
                }}
            >
                {selectNewsAgencyOpen == 'news_ agency_type' &&
                    <>
                        <Row style={{ alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
                            <Title style={{ margin: '0' }}>통신사 선택</Title>
                            <Icon icon={'ph:x-bold'} style={{ fontSize: '42px' }}
                                onClick={() => {
                                    setSelectNewsAgencyOpen(false);
                                }} />
                        </Row>
                        <Col style={{ padding: '1rem', rowGap: '0.25rem' }}>
                            {news_agency_type_list.map((name, idx) => (
                                <div style={{
                                    color: `${item.news_agency_type == idx ? themeObj.main_color.color1 : ''}`,
                                    cursor: 'pointer'
                                }}
                                    onClick={() => {
                                        setItem({
                                            ...item,
                                            ['news_agency_type']: idx
                                        })
                                        setSelectNewsAgencyOpen(false);
                                    }}
                                >{name}</div>
                            ))}
                        </Col>
                    </>}
                {selectNewsAgencyOpen == 'terms_and_conditions' &&
                    <>
                        <Row style={{ alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
                            <Title style={{ margin: '0', fontSize: themeObj.font_size.size5, fontWeight: 'normal' }}>서비스 약관 및 개인정보동의</Title>
                            <Icon icon={'ph:x-bold'} style={{ fontSize: '42px' }}
                                onClick={() => {
                                    setActiveStep(4);
                                    setSelectNewsAgencyOpen(false);
                                }} />
                        </Row>
                        <Col style={{ padding: '0 1rem 1rem 1rem', rowGap: '0.25rem' }}>
                            <Row style={{
                                alignItems: "center",
                                height: '48px',
                                padding: '0.5rem 1rem',
                                margin: '0 0 1rem 0',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                background: `${(item.terms_and_conditions_list.includes(0) && item.terms_and_conditions_list.includes(1) && item.terms_and_conditions_list.includes(2)) ? themeObj.main_color.color1 : themeObj.main_color.color3}`,
                            }}
                                onClick={() => {
                                    if (item.terms_and_conditions_list.includes(0) && item.terms_and_conditions_list.includes(1) && item.terms_and_conditions_list.includes(2)) {
                                        setItem({
                                            ...item,
                                            ['terms_and_conditions_list']: []
                                        })
                                    } else {
                                        setItem({
                                            ...item,
                                            ['terms_and_conditions_list']: [0, 1, 2, 3]
                                        })
                                    }

                                }}
                            >
                                <Icon icon={`icon-park-${(item.terms_and_conditions_list.includes(0) && item.terms_and_conditions_list.includes(1) && item.terms_and_conditions_list.includes(2)) ? 'solid' : 'outline'}:check-one`} style={{ marginRight: '0.5rem', fontSize: '24px' }} />
                                <div>약관 전체 동의</div>
                            </Row>
                            {terms_and_conditions_list.map((term, idx) => (
                                <Row style={{
                                    color: `${item.terms_and_conditions_list.includes(idx) ? themeObj.main_color.color1 : ''}`,
                                    cursor: 'pointer'
                                }}
                                    onClick={() => {
                                        let terms_and_conditions_list = [...item.terms_and_conditions_list];
                                        if (terms_and_conditions_list.includes(idx)) {
                                            let find_idx = terms_and_conditions_list.indexOf(idx);
                                            console.log(find_idx)
                                            terms_and_conditions_list.splice(find_idx, 1);
                                        } else {
                                            terms_and_conditions_list.push(idx);
                                        }
                                        setItem({
                                            ...item,
                                            ['terms_and_conditions_list']: terms_and_conditions_list
                                        })
                                    }}
                                >
                                    <Icon icon={'ph:check-bold'} style={{ marginRight: '0.5rem' }} />
                                    <div>{term.title}</div>
                                </Row>
                            ))}
                            <Button variant="contained" size="large" sx={{ margin: '3rem 0 0 0' }} disabled={isDisableButton()} onClick={() => {
                                setSelectNewsAgencyOpen(false);
                                onClickNextStep();
                            }}>다음</Button>
                        </Col>
                    </>}
            </Drawer>
        </>
    )
}
SignUp.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
export default SignUp;