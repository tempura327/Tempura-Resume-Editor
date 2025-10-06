import { tlsx } from '@/utils/index';
import { ThemeOption, ColorType } from './type';

import Card from '@/components/Card';
import HoverInfoCard from '@/components/HoverInfoCard';

const layoutOptions = [
  {
    imgSrc:
      'https://cdn.enhancv.com/predefined-examples/KlfZ7b3rKNYBg0wvg5XVRtCAWvqzt9RARrBPwlV3/image.png',
    title: 'Hybrid Design',
    description:
      'A colored header with single-column and two-columns. The design effectively separates personal information and key highlights from detailed content, ensuring readability and balance.',
  },
  {
    imgSrc:
      'https://cdn.enhancv.com/images/1098/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vcHJlZGVmaW5lZC1leGFtcGxlcy91Rm5mRUVLUUdXZGxuSk02ancxYWlzMVRwa2Y4OEtUSHpTanJmYXloL2ltYWdlLnBuZw~~.png',
    title: 'Two-column Design',
    description:
      'A clean two-column design, with the left panel showcasing skills and strengths, while the right focuses on professional experience and summary. It conveys clarity, balance, and a strong professional presence.',
  },
];

const themeOptions: ThemeOption[] = [
  [
    {
      hex: '#89a387ff',
      type: ColorType.Primary,
      labelClass: 'bg-[#89a387ff] text-white',
    },
    {
      hex: '#FCD3DE',
      type: ColorType.Accent,
      labelClass: 'bg-[#FCD3DE] text-black',
    },
    {
      hex: '#39393A',
      type: ColorType.Text,
      labelClass: 'bg-[#39393A] text-white',
    },
    {
      hex: '#FFFFFF',
      type: ColorType.TextContrast,
      labelClass: 'bg-[#FFFFFF] border border-gray-200',
    },
  ],
  [
    {
      hex: '#00BFCB',
      type: ColorType.Primary,
      labelClass: 'bg-[#00BFCB] text-white',
    },
    {
      hex: '#FFD45C',
      type: ColorType.Accent,
      labelClass: 'bg-[#FFD45C]',
    },
    {
      hex: '#555555',
      type: ColorType.Text,
      labelClass: 'bg-[#555555] text-white',
    },
    {
      hex: '#FFFFFF',
      type: ColorType.TextContrast,
      labelClass: 'bg-[#FFFFFF] border border-gray-200',
    },
  ],
  [
    {
      hex: '#633E7F',
      type: ColorType.Primary,
      labelClass: 'bg-[#633E7F] text-white',
    },
    {
      hex: '#efd99bff',
      type: ColorType.Accent,
      labelClass: 'bg-[#efd99bff]',
    },
    {
      hex: '#585D59',
      type: ColorType.Text,
      labelClass: 'bg-[#585D59] text-white',
    },
    {
      hex: '#FFFFFF',
      type: ColorType.TextContrast,
      labelClass: 'bg-[#FFFFFF] border border-gray-200',
    },
  ],
];

const SelectLayout = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Select a Layout</h1>

      <section className="flex gap-8">
        {layoutOptions.map(({ imgSrc, title, description }) => (
          <HoverInfoCard
            hoveredElement={
              <>
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
              </>
            }
          >
            <img
              src={imgSrc}
              className="w-80 transition-all"
              alt="layout preview"
            />
          </HoverInfoCard>
        ))}
      </section>

      <h1 className="text-3xl font-bold">Select a Theme</h1>
      <section className="grid grid-cols-3 gap-8">
        {themeOptions.map((theme) => {
          return (
            <Card
              classes={{
                body: 'grid grid-cols-4',
              }}
            >
              {theme.map(({ type, labelClass }) => (
                <div
                  className={tlsx(
                    'w-20 h-20 rounded-full flex text-center justify-center items-center',
                    labelClass,
                    {
                      'text-white': [
                        ColorType.Primary,
                        ColorType.Text,
                      ].includes(type),
                      'text-black': [
                        ColorType.Accent,
                        ColorType.TextContrast,
                      ].includes(type),
                    },
                  )}
                >
                  {type}
                </div>
              ))}
            </Card>
          );
        })}
      </section>
    </div>
  );
};

export default SelectLayout;
