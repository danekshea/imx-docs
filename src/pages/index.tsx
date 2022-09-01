import clsx from 'clsx';
import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Title from '../components/Title';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Article from '../components/Article';
import ArticleStack from '../components/ArticleStack';
import CommunityCard from '../components/CommunityCard';
import SdkDarkIcon from '@site/static/icons/SdkDark';
import SdkLightIcon from '@site/static/icons/SdkLight';
import ContractDarkIcon from '@site/static/icons/ContractDark';
import ExplorerDarkIcon from '@site/static/icons/ExplorerDark';
import ContractLightIcon from '@site/static/icons/ContractLight';
import ExplorerLightIcon from '@site/static/icons/ExplorerLight';
import DevelopersDarkIcon from '@site/static/icons/pictograms/DevelopersDark';
import DevelopersLightIcon from '@site/static/icons/pictograms/DevelopersLight';
import ContributorsDarkIcon from '@site/static/icons/pictograms/ContributorsDark';
import ContributorsLightIcon from '@site/static/icons/pictograms/ContributorsLight';
import Translate, { translate } from '@docusaurus/Translate';

const Homepage = () => {
  const articleStackSectionData = [
    {
      LightIcon: SdkLightIcon,
      DarkIcon: SdkDarkIcon,
      title: translate({ message: 'IMX SDKs' }),
      subtitle: translate({
        message:
          'View all the SDKs on offer to easily integrate with Immutable X.',
      }),
      buttonText: translate({ message: 'Learn More' }),
      link: '/docs/sdks',
    },
    {
      LightIcon: ContractLightIcon,
      DarkIcon: ContractDarkIcon,
      title: translate({ message: 'Code Examples' }),
      subtitle: translate({
        message: 'Accelerate your build with code snippets and samples.',
      }),
      buttonText: translate({ message: 'Learn More' }),
      link: '/docs/code-examples',
    },
    {
      LightIcon: ExplorerLightIcon,
      DarkIcon: ExplorerDarkIcon,
      title: 'Immutascan',
      subtitle: 'Explore live transactions and trade events in real time.',
      buttonText: 'Visit Immutascan',
      link: 'https://immutascan.io',
    },
  ];

  const articleSection2Data = [
    {
      LightIcon: DevelopersLightIcon,
      DarkIcon: DevelopersDarkIcon,
      title: translate({ message: 'Developer Grants' }),
      subtitle: (
        <>
          <Translate>
            Immutable X offers grants to help you fund your next web3 project.
          </Translate>
        </>
      ),
      cta: [
        {
          link: '/docs/contact#building-on-immutable-x',
          text: translate({ message: 'Learn More' }),
        },
      ],
    },
    {
      LightIcon: ContributorsLightIcon,
      DarkIcon: ContributorsDarkIcon,
      title: translate({ message: 'Help Contribute' }),
      subtitle: translate({
        message: 'Help us improve our documentation by contributing!',
      }),
      cta: [
        {
          link: '/docs/contributing',
          text: translate({ message: 'Contributor Guidelines' }),
        },
      ],
    },
  ];

  const communitySectionData = [
    {
      title: translate({ message: 'ImmutableX forum' }),
      subtitle: translate({
        message:
          'Review past questions & get answers to your queries over on the forum.',
      }),
      buttonText: translate({ message: 'Visit the Forum' }),
      isLongCard: true,
      url: 'https://forum.immutable.com',
    },
    {
      title: translate({ message: 'Discord' }),
      subtitle: translate({
        message:
          'Join the conversation! Interact with the Immutable X developer community on Discord.',
      }),
      buttonText: translate({ message: 'Join the Discord' }),
      isLongCard: false,
      url: 'https://discord.com/invite/Dmhp398dna',
    },
    {
      title: translate({ message: 'Twitter' }),
      subtitle: translate({
        message:
          'Follow us on Twitter for the latest product updates & company news.',
      }),
      buttonText: translate({ message: 'Follow Us' }),
      isLongCard: false,
      url: 'https://twitter.com/Immutable',
    },
    {
      title: translate({ message: 'Reddit' }),
      subtitle: translate({
        message: 'Join our subreddit for community memes, updates and more.',
      }),
      buttonText: translate({ message: 'Join Subreddit' }),
      isLongCard: true,
      url: 'https://www.reddit.com/r/ImmutableX/',
    },
  ];

  return (
    <div className="homepage">
      <Layout>
        <div className={styles.root}>
          <div className={styles.heroImage} />
          <Title
            title={
              <div className={clsx('grad', styles.title)}>
                <Translate>Build with</Translate>
                <br className={styles.displayForExtraSmall} /> Immutable X
              </div>
            }
            subtitle={
              <>
                <Translate>
                  Everything you need to superpower your next web3 project,
                  without comprising security or scalability.
                </Translate>
              </>
            }
            className={styles.heroTitle}
          />
          <div className={styles.heroButtonSection}>
            <a href="/docs/welcome">
              <Button onClick={() => console.log('')}>
                <Translate>Explore</Translate>{' '}
                <span className={styles.displayFromExtraSmall}>
                  <Translate>Developer</Translate>
                </span>{' '}
                <Translate>Docs</Translate>
              </Button>
            </a>
          </div>
          <br />
          <br />
          <br />

          <Title
            title={translate({ message: 'Developer Tools' })}
            subtitle={
              <>
                <Translate>
                  Everything you need to start building today.
                </Translate>
              </>
            }
          />
          <div className={styles.articleStackSection}>
            {articleStackSectionData.map((article, index) => (
              <ArticleStack {...article} key={index} />
            ))}
          </div>

          <div
            className={clsx(
              styles.articlesSection,
              styles.displayFromSmall,
              styles.articlesSection2
            )}
            style={{ alignItems: 'center' }}
          >
            {articleSection2Data.map((article, index) => (
              <Article {...article} key={index} />
            ))}
          </div>

          <Title
            title={translate({ message: 'Join The Community' })}
            subtitle={
              <>
                <Translate>Be a part of our community!</Translate>
              </>
            }
          />
          <div className={styles.communityCardSection}>
            {communitySectionData.map((communityInfo, index) => (
              <CommunityCard {...communityInfo} key={index} />
            ))}
          </div>

          <Footer />
        </div>
      </Layout>
    </div>
  );
};

export default Homepage;
