# webgis

地理信息系统（geographic information system，GIS），是一种空间信息系统，它是对整个或部分地球表层（包括大气层）空间中的有关地理分布数据进行采集、存储、管理、运算、分析、显示和描述的技术系统。

主要应用行业：国土空间规划、不动产登记、房产、智慧城市、移动 GIS、环境保护、水利、气象、统计、交通

### Gis 基本功能

- 数据采集与编辑
- 数据存储与管理
- 数据处理与变换
- 空间查询与分析
- 可视化表达与输出
- 二次开发和编程

### Gis 空间数据存储

- 本地存储

  - SHP(Shapefile): 主文件(_.shp)、索引文件（_.shx）、dbase（\*.dbf）表、空间参考文件（.prj）、几何体的空间索引文件（.sbn、.sbx）、只读的几何体空间索引文件(.fbn、.fbx)；
  - CAD（dwg/dxf）、tiff、GeoJSON、KML 等

- 数据库
  - PostgreSQL(PostGis 扩展) 免费 用的比较多
  - MySQL（MySQLSpatial 扩展）免费
  - Oracle（Oraclespatial 扩展）付费

### Gis 中常见的空间关系

主要空间关系有： 拓扑关系、顺序关系和度量关系（最常用）

空间关系表达了**空间数据之间的一种约束**，其中**度量关系**对空间数据的约束最为强烈，而顺序关系次之，拓扑关系最弱。度量关系属于定量关系，拓扑与顺序关系则属于定性关系。

作用：空间关系是 GIS 的重要性理论问题之一，在 GIS 空间数据建模、空间查询、空间分析、空间推理、制图综合、地图理解等过程中起着重要的作用。

### WebGIS 架构

- 客户端展现
  - ArcGIS api、SuperMap iClient 、OpenLayers、MapBox、Leaflet、Cesium 等
- 服务器

  - ArcGis server、SuperMap iServer、GeoServer

- 数据层
  - ArcGis、SuperMap、QGis 等
  - 数据存储：文件（shapefile、SLPK、geoJSON、 3D TIles）、Oracle、MySQL、Postgre

## 相关库

- leaflet （开源）
- openLayers (2d 项目居多，开源)
- ArcGis
- Cesium (国内3d 用的最多)
- MapboxGL （3d 开源）
- SuperMap (商业版，)
- Threejs
- LBS （开源）
  - baidu map js api
  - amap js api
  - google map js api
