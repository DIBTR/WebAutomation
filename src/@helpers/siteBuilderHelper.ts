import { Page } from '@playwright/test';
import ForSiteBuildOptionsPopup from '@models/ForSiteBuildOptionsPopup';
import DrawControlMenuPage from '@pages/common/draw.control.page';
import SiteBuilderOptionPage from '@pages/common/site.builder.option';

export default class SiteBuilderHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async createSite({
    forSiteBuildOptionsPopup,
  }: {
    forSiteBuildOptionsPopup: ForSiteBuildOptionsPopup;
  }): Promise<void> {
    await new DrawControlMenuPage(this.page).openSiteBuilderPoup();
    await new SiteBuilderOptionPage(this.page).enterSiteName(forSiteBuildOptionsPopup.siteName);
    // TODO : This will work after developer fix  the issue https://github.com/Vekta-Group/QAQC/issues/43
    await new SiteBuilderOptionPage(this.page).selectGridFormat(forSiteBuildOptionsPopup.gridFormat);
    await new SiteBuilderOptionPage(this.page).selectPlacementAlignment(forSiteBuildOptionsPopup.placementAlignment);
    await new SiteBuilderOptionPage(this.page).enterRows(forSiteBuildOptionsPopup.rows.toString());
    await new SiteBuilderOptionPage(this.page).enterColumns(forSiteBuildOptionsPopup.columns.toString());
    await new SiteBuilderOptionPage(this.page).enterTurbineSelection(forSiteBuildOptionsPopup.turbineSelection);
    await new SiteBuilderOptionPage(this.page).enterTurbineSpacing(forSiteBuildOptionsPopup.turbineSpacing.toString());
    await new SiteBuilderOptionPage(this.page).enterSiteInsetBuffer(
      forSiteBuildOptionsPopup.siteInsetBuffer.toString()
    );
    await new SiteBuilderOptionPage(this.page).enterTurbineAngle(forSiteBuildOptionsPopup.turbineAngle);
    await new SiteBuilderOptionPage(this.page).clickOnCreateSite();
    await this.page.waitForTimeout(60000);
  }
}
