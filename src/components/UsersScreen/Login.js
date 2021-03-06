import React from 'react'
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
} from 'react-native'
import Colors from '../../res/Colors'
import Loader from '../../Generics/Loader'
import style from './styles'
import UserSession from '../../libs/sessions';

const imageBackground = {
    uri: 'https://cdn.nohat.cc/thumb/f/720/ca65ccaa99084180a62f.jpg',
};

class Login extends React.Component {

    state = {
        loading: false,
        error: null,
        user: undefined,
        isPasswordVisible: true,
        form: {},
    };

    componentDidMount = () => {
        this.deleteTokens();
    };

    deleteTokens = async () => {
        await UserSession.instance.logout();
    };

    handleSubmit = async () => {
        try {
            this.setState({ loading: true, error: null, user: undefined });
            let response = await UserSession.instance.login(this.state.form);
            if (typeof response == 'object') {
                console.log(response);
                if (response['405']) {
                    var message = 'Account is not verified';
                } else {
                    var message = 'Invalid Username or Password. please try again.';
                }
                this.setState({ loading: false, error: message, user: undefined });
            } else {
                this.setState({ loading: false, error: null, user: response });
            }
        } catch (err) {
            this.setState({ loading: false, error: err });
        }
        if (this.state.user) {
            this.props.navigation.replace('BadgesTabNavigator');
        }
    };

    toggleIsPasswordVisible = () => {
        if (this.state.isPasswordVisible) {
            this.setState({ isPasswordVisible: false });
        } else {
            this.setState({ isPasswordVisible: true });
        }
    };

    handleSignUp = async () => {
        this.props.navigation.navigate("Signup");
    }

    render() {
        const { isPasswordVisible, loading, error } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <ImageBackground source={imageBackground} style={styles.image}>
                    <View style={styles.layerColor}>
                        <View style={styles.form}>
                            <Text style={styles.title}>Login</Text>
                            {error ? (
                                <View style={style.errorContainer}>
                                    <Text style={style.errorMsg}>
                                        {error}
                                    </Text>
                                </View>
                            ) : null}
                            <Text style={styles.inputText}>Username</Text>
                            <TextInput style={styles.input}

                                keyboardAppearance="dark"
                                onChangeText={text => {
                                    this.setState(prevState => {
                                        let form = Object.assign({}, prevState.form);
                                        form.username = text;
                                        return { form };
                                    });
                                }}
                            ></TextInput>
                            <Text style={styles.inputText}>Password</Text>
                            <View style={style.password}>
                                <TextInput style={style.input}
                                    secureTextEntry={isPasswordVisible}

                                    keyboardAppearance="dark"
                                    onChangeText={text => {
                                        this.setState(prevState => {
                                            let form = Object.assign({}, prevState.form);
                                            form.password = text;
                                            return { form };
                                        });
                                    }}
                                />
                                <TouchableOpacity onPress={this.toggleIsPasswordVisible}>
                                    <Image
                                        style={{ marginRight: 10 }}
                                        source={
                                            isPasswordVisible
                                                ? require('../../assets/show.png')
                                                : require('../../assets/hide.png')
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.handleSubmit}
                            >
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.handleSignUp}
                            >
                                <Text style={styles.Textbot}>You don't have an account. Sign Up.</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    title: {
        color: Colors.white,
        fontSize: 38,
        textAlign: 'center',
    },
    horizontal: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    form: {
        paddingHorizontal: 20,
        height: 365,
        borderRadius: 30,
    },
    input: {
        width: 250,
        height: 40,
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderWidth: 1,
        color: Colors.white,
        borderRadius: 10,
        backgroundColor: Colors,
        borderColor: Colors.white,
    },
    layerColor: {
        flex: 2,
        backgroundColor: '#04593A80',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    inputText: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5,
        color: Colors.white,
        marginLeft: 10,
    },
    button: {
        padding: 15,
        height: 45,
        marginTop: 25,
        borderRadius: 15,
        backgroundColor: 'transparent',
        borderColor: Colors.white,
        borderWidth: 1,
    },
    buttonText: {
        position: 'absolute',
        textAlign: 'center',
        top: 8,
        left: 75,
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 25,
        color: Colors.white,
        zIndex: 20
    },
    Textbot: {
        color: Colors.white,
        marginTop: '5%',
        fontSize: 15,
    },
    placeholderStyle: {
        textAlign: 'center'
    }
});

export default Login;