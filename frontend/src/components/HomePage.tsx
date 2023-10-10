import Carousel from 'react-bootstrap/Carousel';

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
      'imgPath':'../../public/home_images/che_old_building.jpg', 
      'description':'Chemical Engineering I Building'
    },
    {
      'id':'2', 
      'isSlideShow': true,
      'imgPath':'../../public/home_images/che_new_building.jpg', 
      'description':'Chemical Engineering II Building'
    }
  ];

  return (
    <Carousel>
    { dummys.map(dummy => (
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
  );
}