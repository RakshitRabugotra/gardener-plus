import { Section } from '@/components/Section'
import { ImageCard } from '@/components/ui/ImageCard'
import { PlantDescription } from '@/types/plants'
import { FlatList } from 'react-native'

interface PlantScan extends Partial<PlantDescription> {
  id: string
  image: string
  plantCommonName: string
}

const scans: PlantScan[] = [
  { id: '1', plantCommonName: 'A', image: 'some-image' },
  { id: '2', plantCommonName: 'B', image: 'some-image' },
  { id: '3', plantCommonName: 'C', image: 'some-image' },
  { id: '4', plantCommonName: 'D', image: 'some-image' },
  { id: '5', plantCommonName: 'E', image: 'some-image' },
  { id: '6', plantCommonName: 'F', image: 'some-image' },
]

export const PreviousScans = () => {
  return (
    <Section title='Previous scans'>
      <FlatList
        horizontal
        data={scans}
        renderItem={({ item }) => <ScanCard {...item} key={item.id} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <ImageCard
            text='Search plants to add'
            styles={{
              text: {
                paddingHorizontal: 16,
                fontSize: 14,
                maxWidth: 150,
                textOverflow: 'wrap',
              },
              image: {
                width: 50,
                height: 50,
                margin: 30,
                marginHorizontal: 'auto',
              },
            }}
          />
        )}
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 12 }}
        contentContainerStyle={{ gap: 16 }}
      />
    </Section>
  )
}

const ScanCard = ({ image, plantCommonName }: PlantScan) => (
  <ImageCard text={plantCommonName} imageSrc={image} />
)
