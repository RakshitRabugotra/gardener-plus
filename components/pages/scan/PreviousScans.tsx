import { FlatList } from 'react-native'
import { Section } from '@/components/Section'
import { ImageCard } from '@/components/ui/ImageCard'
import { PlantScan } from '@/types/plants'
import { useEffect, useState } from 'react'
import { getScans } from '@/service/storage'
import { Href } from 'expo-router'

export const PreviousScans = () => {
  const [scans, setScans] = useState<PlantScan[]>([])

  useEffect(() => {
    getScans()
      .then((storageScans) => storageScans && setScans(storageScans))
      .catch((error) =>
        console.error(
          'Error while setting scans in PreviousScans ' + error?.toString()
        )
      )
  }, [])

  return (
    <Section title='Previous scans'>
      <FlatList
        horizontal
        data={scans}
        renderItem={({ item }) => <ScanCard {...item} key={item?.id} />}
        keyExtractor={(item) => item?.id?.toString() ?? 0}
        ListEmptyComponent={
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
        }
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 12 }}
        contentContainerStyle={{ gap: 16 }}
      />
    </Section>
  )
}

const ScanCard = ({
  image,
  plantCommonName,
  plantScientificName,
}: PlantScan) => (
  <ImageCard
    text={plantCommonName}
    imageSrc={image}
    href={
      plantScientificName
        ? (('/search?name=' + plantScientificName) as Href)
        : undefined
    }
    styles={{
      base: {
        overflow: 'hidden',
        borderRadius: 12,
      },
      image: {
        aspectRatio: 1,
        overflow: 'hidden',
        borderRadius: 12,
      },
      text: {
        maxWidth: '80%',
        textOverflow: 'wrap',
        marginHorizontal: 'auto',
      },
    }}
  />
)
