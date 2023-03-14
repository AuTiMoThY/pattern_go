Pattern Go
│  index.html          : 首頁(登入狀態)
│  index_no_login.html : 首頁(未登入狀態)
│  mbr_mgmt_home.html  : 檔案管理頁
│
├─public
│  ├─bg_img
│  │
│  ├─css
│  │
│  ├─images
│  │
│  ├─js
│  │  │  pgelm.js  => HTML元素(popup、dialog)、表單
│  │  │  script.js => JS 主程式
│  │  └─page
│  │          home.js     => 首頁JS
│  │          mbr_mgmt.js => 檔案管理JS
│  │
│  └─plugins : 使用的JS套件
│
└─_build
    └─pug : HTML 樣板參考
            index.pug
            index_no_login.pug
            mbr_mgmt_all.pug
            mbr_mgmt_archive.pug
            mbr_mgmt_fav.pug
            mbr_mgmt_folder.pug
            mbr_mgmt_home.pug
            mbr_mgmt_trash.pug
            mbr_wallet.pug
            _footer.pug
            _header-no_login.pug
            _header.pug
            _layout.pug => HTML 樣板參考
            _mbr-header.pug
- - -

# script.js
      JS 主程式

## TOC
*
* pgUI
* - pgUI.init 共用  <<入口>>
* - pgUI.disableScroll()
* - pgUI.enableScroll()
* - pgUI.validateEmail(email)
* - pgUI.getURL()
* - pgUI.getTime()
* - pgUI.goTop()
* - pgUI.tabs(defaultShow, opt)
* - pgUI.dropdown  下拉選單
* -- pgUI.dropdown.init(elm[string])
* -- pgUI.dropdown.itemClick(itemElm, callback)
* - pgUI.selectStyled()  <select> 美化
* -- pgUI.selectStyled().init(target)
* -- pgUI.selectStyled().styled(target)
* - pgUI.highlight(elm, name) 高亮顯示
* - pgUI.toggleContent(hideCnt, showCnt, zIndex= 10)
* - pgUI.toggleLayout(elm, classAddToElm)
* - pgUI.checkInputErr()
* - pgUI.pageHome  <<首頁>>
* - pgUI.openItemMore(e)
* ================================================================================================
* pgAni
* - pgAni.story(elm)
* - pgAni.homeScroll
* -- pgAni.homeScroll.howToUse(isDebug)
* -- pgAni.homeScroll.why(isDebug)
* ================================================================================================
* pgPopup
* -- pgPopup.build(action, frmSetup)
* -- pgPopup.open(action, frmSetup, callback)
* -- pgPopup.close()
* -- pgPopup.change(action)
* ready



# home.js
      首頁用JS，包含登入、註冊的動作，和banner動畫

## TOC

* pgBannerAni
* - pgBannerAni.init()
* - pgBannerAni.cloudBase()
* - pgBannerAni.cloudAni1(elm)
* - pgBannerAni.cloudAni2(elm)
* - pgBannerAni.main() 主體動畫 <<入口2>>
* -- pgBannerAni.main().base() 底座
* -- pgBannerAni.main().decoration() 裝飾 & 紙
* -- pgBannerAni.main().pating() 圖紙
* - pgBannerAni.paper 圖紙
* - pgBannerAni.controllTop
* - pgBannerAni.controllBottom
* - pgBannerAni.smoke
* - pgBannerAni.planet
* - pgBannerAni.unknowSvg()
* - pgBannerAni.btns
* -- pgBannerAni.btns.build(elm)
* -- pgBannerAni.btns.down(elm)
* - pgBannerAni.drawing
* -- pgBannerAni.drawing.build(elm)
* -- pgBannerAni.drawing.init() 初始狀態
* -- pgBannerAni.drawing.inAni()  <<入口3>>
* - pgBannerAni.people