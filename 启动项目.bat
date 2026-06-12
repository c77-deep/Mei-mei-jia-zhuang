@echo off
echo ========================================
echo    美家家装 - 启动脚本
echo ========================================
echo.

echo [1/3] 检查环境...
java -version >nul 2>&1
if errorlevel 1 (
    echo 错误: 未安装 Java，请先安装 Java 17
    pause
    exit /b 1
)

echo [2/3] 下载 Maven Wrapper (如已存在则跳过)...
if not exist "backend\mvnw.cmd" (
    cd backend
    curl -sL https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar -o .mvn\wrapper\maven-wrapper.jar
    echo distributionUrl=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip > .mvn\wrapper\maven-wrapper.properties
    cd ..
)

echo [3/3] 启动项目...
echo.
echo 后端启动中... (首次启动需要下载依赖，请耐心等待)
echo 前端访问地址: http://localhost:8080/index.html
echo API文档地址: http://localhost:8080/h2-console
echo.

cd backend
call mvnw.cmd spring-boot:run

pause
