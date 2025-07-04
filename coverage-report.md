# Test Coverage Report - Space Flight News MCP Server

## カバレッジ設定概要

### 現在の設定
- **テストフレームワーク**: Jest
- **テスト環境**: Node.js
- **カバレッジディレクトリ**: `/coverage`
- **レポート形式**: text, text-summary, lcov, html

### カバレッジ閾値
```javascript
coverageThreshold: {
  global: {
    branches: 50,    // 分岐カバレッジ
    functions: 60,   // 関数カバレッジ  
    lines: 70,       // 行カバレッジ
    statements: 70   // 文カバレッジ
  }
}
```

## テストファイル

### 1. `tests/simple.test.js`
- **目的**: 基本的な JavaScript 機能のテスト
- **内容**: 文字列、配列、オブジェクト、Promise、エラーハンドリング
- **テスト数**: 7個

### 2. `tests/integration.test.js` 
- **目的**: 統合テスト・API動作の検証
- **内容**: 記事フォーマット、API レスポンス、URL構築、エラーケース
- **テスト数**: 9個

### 3. `tests/coverage.test.js`
- **目的**: カバレッジ測定可能な機能のテスト
- **内容**: データ処理、バリデーション、エラーハンドリング、文字列処理
- **テスト数**: 11個

## カバレッジレポートの確認方法

### コマンドライン
```bash
npm run test:coverage
```

### HTMLレポート
1. テスト実行後、`coverage/lcov-report/index.html` を開く
2. ブラウザでビジュアルなカバレッジレポートを確認

### CI/CD統合
- `coverage/lcov.info` ファイルが生成される
- Codecov、Coveralls などのサービスと連携可能

## 制限事項と改善点

### 現在の制限
1. **ESM/CommonJS の問題**: TypeScript ES Modules のテストが困難
2. **実際のソースコードカバレッジ**: `src/*.ts` ファイルの直接測定ができない
3. **モックの複雑さ**: MCP SDK の依存関係が測定を困難にしている

### 改善案
1. **Babel 設定**: ESM サポートの改善
2. **別設定ファイル**: テスト専用の tsconfig 作成
3. **統合テスト環境**: 実際の MCP サーバーを起動してのテスト

## ベストプラクティス

### テスト戦略
- **単体テスト**: 個別関数の動作確認
- **統合テスト**: 複数コンポーネント間の連携確認
- **カバレッジテスト**: 測定可能な範囲での網羅性確認

### 継続的改善
- 定期的なカバレッジ閾値の見直し
- 新機能追加時のテスト追加
- CI/CD パイプラインでの自動実行