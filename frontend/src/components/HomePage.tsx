import Carousel from 'react-bootstrap/Carousel';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export type HomeDataProp = {
  id: string;
  isSlideShow: boolean;
	imgPath: string;
	description: string;
};

export default function HomePage() {

  const dummys: HomeDataProp[] = [
    {
      'id':'1',
      'isSlideShow': true,
      'imgPath':'/home_images/che_old_building.jpg', 
      'description':'Chemical Engineering I Building'
    },
    {
      'id':'2', 
      'isSlideShow': true,
      'imgPath':'/home_images/che_new_building.jpg', 
      'description':'Chemical Engineering II Building'
    }
  ];

  const itemData = [
    {
      img: 'public/new_home_images/grey_circle_array.jpg',
      title: 'plasma1',
    },
    {
      img: '/new_home_images/ntuche.jpg',
      title: 'plasma2',
    },
    {
      img: '/new_home_images/grey_wording_scroll.jpg',
      title: 'plasma3',
    },
    {
      img: '/new_home_images/grey_wording_scroll.jpg',
      title: 'plasma3',
    },
    {
      img: '/new_home_images/grey_circle_array.jpg',
      title: 'plasma1',
    },
    {
      img: '/new_home_images/purple_circle_array.jpg',
      title: 'plasma2',
    },
  ];

  return (
    <>
      <Carousel>
        {dummys.map(dummy => (
          <Carousel.Item key={dummy.id} interval={500}>
            <img
              className="d-block w-100"
              src={dummy.imgPath}
              alt={dummy.description}
            />
            <Carousel.Caption>
              <h3>{dummy.description}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <ImageList sx={{ width: 'full', height: 740 }} variant="woven" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={item.img}
              src={item.img}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      {/* <ImageList sx={{ width: 'full', height: 540 }} cols={3} rowHeight={180} >
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={item.img}
            src={item.img}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
      </ImageList> */}
    </>
  );
}
