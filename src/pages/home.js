import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  LogBox,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  AlertIOS,
} from 'react-native';
// import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 100;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      cart: 0,
      product: [
        {
          id: 1,
          name: 'Air Max 270',
          image: require('../img/air-max-270.jpeg'),
        },
        {
          id: 2,
          name: 'Air Max',
          image: require('../img/air-max.jpg'),
        },
        {
          id: 3,
          name: 'Air Presto',
          image: require('../img/air-presto.png'),
        },
        {
          id: 4,
          name: 'Daybreak',
          image: require('../img/daybreak.jpg'),
        },
        {
          id: 5,
          name: 'huarache',
          image: require('../img/huarache.jpg'),
        },
        {
          id: 6,
          name: 'Revolution 5',
          image: require('../img/revolution5.jpeg'),
        },
      ],
      activeIndex: 0,
      carouselItems: [
        {
          title: 'Item 1',
          text: 'Text 1',
          image: require('../img/banner2.jpeg'),
        },
        {
          title: 'Item 2',
          text: 'Text 2',
          image: require('../img/banner2.jpeg'),
        },
        {
          title: 'Item 3',
          text: 'Text 3',
          image: require('../img/banner2.jpeg'),
        },
      ],
    };
  }

  componentDidMount() {
    // this.getProductData();
    // console.log(this.state);
  }

  _renderItem({item, index}) {
    return (
      <View
        style={{
          backgroundColor: 'floralwhite',
          borderRadius: 20,
          height: 150,
          width: '100%',
        }}>
        <Image source={item.image} style={styles.imgBanner} />
      </View>
    );
  }

  get pagination() {
    const {carouselItems, activeIndex} = this.state;
    return (
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeIndex}
        containerStyle={{marginBottom: 30}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          borderColor: 'black',
          borderWidth: 1,
        }}
        activeDotStyle={{
          backgroundColor: 'black',
        }}
        inactiveDotStyle={{
          backgroundColor: 'white',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  renderProducts = ({item, index}) => {
    return (
      <View style={styles.productList}>
        <View style={styles.productImage}>
          <Image source={item.image} style={styles.imgProduct} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#706c6c',
            justifyContent: 'center',
            width: '100%',
            height: '20%',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <View style={{width: '20%', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => this.onClickAdd(item.name)}
              style={{zIndex: 1}}>
              <View
                style={{
                  backgroundColor: 'white',
                  alignSelf: 'center',
                  alignItems: 'center',
                  // width: '100%',
                  borderRadius: 5,
                  padding: 5,
                  zIndex: 1,
                }}>
                <Icon name="plus" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{width: '5%'}} />
          <View style={{width: '65%', justifyContent: 'center'}}>
            <Text style={{color: 'white'}}>{item.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  onClickAdd = name => {
    var msg = 'Added ' + name;

    if (Platform.OS == 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
    this.setState({
      cart: this.state.cart + 1,
    });
  };

  render() {
    const {product, cart, clicked} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.headerStyle}>
            <View style={styles.centerHeader}>
              <View style={{flexDirection: 'column', flex: 1}}>
                <View style={{height: '50%'}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({clicked: !this.state.clicked})
                    }>
                    {clicked ? (
                      <Icon name="close" style={{margin: 10}} size={32} />
                    ) : (
                      <Icon name="bars" style={{margin: 10}} size={32} />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={{height: '50%'}}>
                  <Text style={styles.titleStyle}>Nike App Store</Text>
                </View>
              </View>
            </View>
            <View style={styles.rightHeader}>
              <View style={{flexDirection: 'column', flex: 1}}>
                <View style={{height: '50%'}}>
                  <Icon
                    name="shopping-cart"
                    style={{margin: 10, alignSelf: 'flex-end'}}
                    size={32}
                  />
                  {cart == 0 ? null : (
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeStyle}>{cart}</Text>
                    </View>
                  )}

                  {/* </Icon> */}
                </View>
                <View style={{height: '50%'}} />
              </View>
            </View>
          </View>
          <View style={styles.carouselContainer}>
            <Carousel
              layout={'default'}
              ref={ref => (this.carousel = ref)}
              data={this.state.carouselItems}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              renderItem={this._renderItem}
              onSnapToItem={index => this.setState({activeIndex: index})}
              autoplay={true}
              loop={true}
            />
            {this.pagination}
          </View>
          <View style={styles.productContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={product}
              renderItem={item => this.renderProducts(item)}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container2: {
    flex: 1,
    backgroundColor: '#e3e3e3',
    borderTopRightRadius: 250,
  },
  headerStyle: {
    height: '20%',
    flexDirection: 'row',
  },
  centerHeader: {
    width: '70%',
    height: '100%',
    marginLeft: '10%',
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    marginLeft: 10,
  },
  rightHeader: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
  },
  addButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#ffffff',
    width: 'auto',
    height: 'auto',
    padding: 8,
    borderRadius: 10,
    marginRight: 10,
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    margin: 5,
    // backgroundColor: 'red'
  },
  productStyle: {
    flex: 1,
    // flexDirection: 'row',
    // backgroundColor: 'red',
    marginTop: '10%',
    alignItems: 'center',
  },
  productList: {
    height: 250,
    width: 160,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // justifyContent: 'center',
    // alignSelf: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  imageStyle: {
    width: '100%',
    height: '75%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'stretch',
  },
  bottomList: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    marginLeft: 7,
  },
  productName: {
    fontWeight: 'bold',
    color: '#858585',
    marginTop: 5,
    marginBottom: 5,
  },
  imgBanner: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  carouselContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
    height: "100%",
    // marginBottom: 20,
    // backgroundColor: 'red',
  },
  productContainer: {
    flex: 1,
    marginTop: -50,
  },
  imgProduct: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productImage: {
    height: '80%',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // backgroundColor: 'red',
  },
  badgeStyle: {color: 'white', margin: 3, fontSize: 10},
  badgeContainer: {
    backgroundColor: 'red',
    borderRadius: 10,
    margin: 5,
    position: 'absolute',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
