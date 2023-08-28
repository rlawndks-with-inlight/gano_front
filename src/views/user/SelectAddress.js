import { Icon } from '@iconify/react';
import { Button, TextField } from '@mui/material';
import { m } from 'framer-motion'
import { useState } from 'react';
import { varFade } from 'src/components/animate';
import { Col, InputTitle, Row, Title, themeObj } from 'src/components/elements/styled-components';
import styled from 'styled-components';

const Wrappers = styled.div`
width:100%;
max-width:840px;
margin:0 auto;
display: flex;
flex-direction: column;
height:100vh;
`
const addressFormat = (address_title, hospital_type, address) => {
    return {
        address_title,
        hospital_type,
        address,
    }
}
const address_list = [
    addressFormat('서울삼성병원', '종합병원', '서울특별시 강남구 일원로 81 삼성의료원'),
    addressFormat('강북삼성병원', '종합병원', '서울특별시 종로구 새문안로 29\n강북삼성병원'),
    addressFormat('삼성서울병원 암병원', '종합병원', '서울특별시 강남구 일원로 81 삼성의료원'),
]
const AddressListContainer = styled.div`
border-top:2px solid ${themeObj.main_color.color2};
margin-top:1rem;
color:${themeObj.main_color.color2};
`
const AddressList = (props) => {
    const { list, onClickAddress } = props;
    return (
        <>
            <AddressListContainer>
                <Col style={{ width: '90%', margin: 'auto' }}>
                    {list && list.map((item, idx) => (
                        <>
                            <Col style={{ padding: '1rem 0', rowGap: '0.25rem', borderBottom: `1px solid ${themeObj.main_color.color2}`, cursor: 'pointer' }}
                                onClick={() => {
                                    onClickAddress(item)
                                }}
                            >
                                <Row style={{ alignItems: 'center' }}>
                                    <Icon icon={'ion:location'} />
                                    <div style={{ marginLeft: '1rem' }}>
                                        {item.address_title}
                                    </div>
                                </Row>
                                <Row style={{ marginLeft: '2rem', fontSize: themeObj.font_size.size9 }}>{item.hospital_type}</Row>
                                <Row style={{ marginLeft: '2rem', fontSize: themeObj.font_size.size8 }}>{item.address}</Row>
                            </Col>
                        </>
                    ))}
                </Col>
            </AddressListContainer>
        </>
    )
}
const SelectAddress = (props) => {
    const {
        title,
        onSelectAddress
    } = props;

    const [search, setSearch] = useState("");
    const [selectAddress, setSelectAddress] = useState(undefined);
    const [addressList, setAddressList] = useState([]);
    const onSearch = () => {
        setAddressList(address_list);
    }
    const onClickAddress = (item) => {
        setSelectAddress(item)
    }
    return (
        <>
            <Wrappers>
                {selectAddress ?
                    <>
                        <m.div variants={varFade().inRight} style={{ width: '90%', margin: '0 auto' }}>
                            <InputTitle style={{ margin: '3rem auto 1rem 0' }}>위치 및 주소를 확인해 주세요</InputTitle>
                        </m.div>
                        <m.div variants={varFade().inRight} style={{ width: '100%', margin: '0 auto' }}>
                            <div style={{
                                background: themeObj.main_color.color3,
                                fontSize: themeObj.font_size.size3,
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: '6rem 0'
                            }}>지도화면</div>
                        </m.div>
                        <m.div variants={varFade().inRight} style={{ width: '90%', margin: '0 auto' }}>
                            <Title style={{ borderBottom: `2px solid ${themeObj.main_color.color3}`, padding: '0 0 1rem 0' }}>{selectAddress?.address_title}</Title>
                            <div style={{ color: themeObj.main_color.color2, fontSize: themeObj.font_size.size8, padding: '0 0 0 1rem' }}>
                                {selectAddress?.address}
                            </div>
                        </m.div>
                        <m.div variants={varFade().inRight} style={{ width: '90%', margin: 'auto auto 1rem auto', display: 'flex', flexDirection: 'column' }}>
                            <Button variant="contained" size="large" sx={{ margin: 'auto 0 1rem 0', background: themeObj.main_color.color3 }} onClick={() => { setSelectAddress(undefined) }}>다시찾기</Button>
                            <Button variant="contained" size="large" sx={{ margin: 'auto 0 1rem 0' }} onClick={() => {
                                onSelectAddress(selectAddress)
                            }}>다음</Button>
                        </m.div>
                    </>
                    :
                    <>
                        <m.div variants={varFade().inRight} style={{ width: '90%', margin: '0 auto' }}>
                            <InputTitle style={{ margin: '3rem auto 1rem 0' }}>{title}</InputTitle>
                            <TextField
                                variant="standard"
                                sx={{ width: '100%' }}
                                placeholder="주소를 입력해 주세요"
                                inputProps={{
                                    style: {
                                        padding: '1rem 0.5rem'
                                    },
                                }}
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                                onKeyPress={(e) => {
                                    if (e.key == 'Enter') {
                                        onSearch();
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <Row style={{ alignItems: 'center' }}>
                                            <Icon icon={'zondicons:close-solid'} style={{ margin: '0.5rem', fontSize: '20px', cursor: 'pointer' }} onClick={() => { setSearch("") }} />
                                            <Icon icon={'ion:search'} style={{ margin: '0.5rem', fontSize: '24px', cursor: 'pointer' }} onClick={onSearch} />
                                        </Row>
                                    ),
                                    startAdornment: (
                                        <Icon icon={'fluent:location-arrow-28-filled'} style={{ margin: '0.5rem', fontSize: '28px' }} />
                                    ),
                                }}
                                readOnly={true}
                            />
                        </m.div>
                        <AddressList list={addressList} onClickAddress={onClickAddress} />
                        <Row style={{
                            position: 'fixed',
                            bottom: '0',
                            left: '0',
                            width: '100%',
                        }}>
                            <Row style={{
                                background: themeObj.main_color.color2,
                                margin: 'auto',
                                maxWidth: '840px',
                                width: '100%',
                                flexWrap: 'wrap',
                            }}>
                                <InputTitle style={{ margin: '1rem' }}>최근 이용 기록</InputTitle>

                            </Row>
                        </Row>
                    </>}
            </Wrappers>
        </>
    )
}
export default SelectAddress;