import React, { Component } from 'react';
import { View, Text } from 'react-native';

class PrivacyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <Text> Greatsun cung cấp gì?{"\n"}
        -	Greatsun là ứng dụng nhắn tin và gọi điện giúp kết nối an toàn với độ bảo mật cao.{"\n"}
        -	Cuộc gọi đơn giản dễ sử dụng khi kết nối internet.{"\n"}
        -	Âm thanh chất lượng hình ảnh HD khi gọi trực tiếp.{"\n"}
        -	Cho phép tạo ra 2 đến 3 tài khoản liên lạc trên một đầu số với công thức địa chỉ Greatsun và kênh liên lạc doanh nghiệp.{"\n"}
        -	Tạo các tài khoản khác và đăng nhập trong hệ Greatsun bằng công thức địa chỉ Greatsun.{"\n"}
        
        
        Người sử dụng Greatsun không được làm gì?{"\n"}
        -	Người sử dụng dịch vụ Greatsun không được lợi dung dịch vụ Greatsun để xuyên tạc, đưa những thông tin sai sự thật, vu khống hoặc lừa đảo, tệ nạn xã hội.{"\n"}
-	Mọi hành vi trái pháp luật người dùng tự chịu trách nhiệm với pháp luật.</Text>
            </View>
        );
    }
}

export default PrivacyModal;
