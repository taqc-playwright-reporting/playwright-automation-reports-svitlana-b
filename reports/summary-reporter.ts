import type {
  Reporter, FullConfig, Suite, TestCase, TestResult, FullResult,
} from '@playwright/test/reporter';

class SummaryReporter implements Reporter {
  private passed = 0;
  private skipped = 0;
  private failed = 0;
  private failedTests: string[] = [];

  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting tests...`);
    console.log(`Total tests: ${suite.allTests().length}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    switch (result.status) {
      case 'passed':
        this.passed++;
        break;
      case 'skipped':
        this.skipped++;
        break;
      case 'failed':
      case 'timedOut':
      case 'interrupted':
        this.failed++;
        this.failedTests.push(test.title);
        break;
    }
  }

  onEnd(result: FullResult) {
    console.log(`Passed: ${this.passed}`);
    console.log(`Failed: ${this.failed}`);
    console.log(`Skipped: ${this.skipped}`);
    if (this.failedTests.length > 0) {
      console.log('Failed tests:');
      for (const title of this.failedTests) {
        console.log(`- ${title}`);
      }
    }
    console.log(`Status: ${result.status}`);
  }
}

export default SummaryReporter;
