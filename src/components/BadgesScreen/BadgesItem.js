import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Pressable
} from 'react-native'
import Colors from '../../res/Colors'

class BadgesItem extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={styles.row}>
                        <Image
                            style={styles.profile}
                            source={{ uri: `${item.profile_picture_url}` }}
                        />
                        <View style={styles.userData}>
                            <Text style={styles.nameText}> {item.name} </Text>
                            <Text style={styles.rankText}> {item.rank} </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.icons}>
                    {this.props.onEdit ? (
                        <Pressable onPress={this.props.onEdit}>
                            <Image
                                style={styles.editIcon}
                                source={require('../../assets/edit_icon.png')}
                            />
                        </Pressable>
                    ) : null}
                    {this.props.onDelete ? (
                        <Pressable onPress={this.props.onDelete}>
                            <Image
                                style={styles.deleteIcon}
                                source={require('../../assets/delete_icon.png')}
                            />
                        </Pressable>
                    ) : null}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 1,
    },
    row: {
        flexDirection: 'row',
    },
    profile: {
        width: 55,
        height: 55,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
        color: Colors.white,
    },
    rankText: {
        fontWeight: '100',
        paddingLeft: 20,
        color: Colors.white
    },
    icons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    editIcon: {
        height: 22,
        width: 22,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    deleteIcon: {
        marginLeft: 15,
        height: 22,
        width: 22,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});

export default BadgesItem;